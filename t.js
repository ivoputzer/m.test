/**
 * Run the generator object `genObj`,
 * report results via the callbacks in `callbacks`.
 */
function from_generator(genObj, callbacks = undefined) {
  handleOneNext();

  /**
   * Handle one invocation of `next()`:
   * If there was a `prevResult`, it becomes the parameter.
   * What `next()` returns is what we have to run next.
   * The `success` callback triggers another round,
   * with the result assigned to `prevResult`.
   */
  function handleOneNext(prevResult = null) {
    try {
      let yielded = genObj.next(prevResult); // may throw
      if (yielded.done) {
        if (yielded.value !== undefined) {
          // Something was explicitly returned:
          // Report the value as a result to the caller
          callbacks.success(yielded.value);
        }
      } else {
        setTimeout(runYieldedValue, 0, yielded.value);
      }
    }
    // Catch unforeseen errors in genObj
    catch (error) {
      if (callbacks) {
        callbacks.failure(error);
      } else {
        throw error;
      }
    }
  }
  function runYieldedValue(yieldedValue) {
    if (yieldedValue === undefined) {
      // If code yields `undefined`, it wants callbacks
      handleOneNext(callbacks);
    } else if (Array.isArray(yieldedValue)) {
      runInParallel(yieldedValue);
    } else {
      // Yielded value is a generator object
      runGenObj(yieldedValue, {
        success(result) {
          handleOneNext(result);
        },
        failure(err) {
          genObj.throw(err);
        },
      });
    }
  }

  function runInParallel(genObjs) {
    let resultArray = new Array(genObjs.length);
    let resultCountdown = genObjs.length;
    for (let [i,genObj] of genObjs.entries()) {
      runGenObj(genObj, {
        success(result) {
          resultArray[i] = result;
          resultCountdown--;
          if (resultCountdown <= 0) {
            handleOneNext(resultArray);
          }
        },
        failure(err) {
          genObj.throw(err);
        },
      });
    }
  }
}

function run() {
  from_generator(genFunc());
}

// function is_generator(obj) {
//   return 'function' == typeof obj.next && 'function' == typeof obj.throw;
// }

// function is_generator_function(obj) {
//   var constructor = obj.constructor;
//   if (!constructor) return false;
//   if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
//   return isGenerator(constructor.prototype);
// }
