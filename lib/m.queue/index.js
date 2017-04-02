"use strict";
/**
 * AsyncQueue is a simple FIFO queue to execute async jobs linear.
 *
 * Copyright (c) 2012, Martin Jonsson All Rights Reserved.
 * Available via the MIT or new BSD license.
 *
 * http://github.com/martinj/node-async-queue
 *
 *  Example
 *
 *  new AsyncQueue(function (err, job) {
 *    if (err) job.fail(err);
 *    setTimeout(function () {
 *      console.log('First job executed')
 *      job.success();
 *    }, 500);
 *  }, function (err, job) {
 *    console.log('Second job executed');
 *    job.success();
 *  }).run();
 *
 *
 */
function AsyncQueue() {
  this.jobs = Array.prototype.slice.call(arguments);
  this.running = false;
}

AsyncQueue.prototype = {

  /**
   * Add job to the queue
   *
   * @param  {Function} job
   */
  add: function (job) {
    if (job) {
      if (arguments.length > 1) {
        this.jobs = this.jobs.concat(Array.prototype.slice.call(arguments));
      } else {
        this.jobs.push(job);
      }
    }
    return this;
  },

  /**
   * Start running the queue
   *
   * @param  {Function} [job] optional add a job to the queue at the same time
   */
  run: function (job) {
    this.add(job);

    if (!this.running) {
      this.start();
    }
    return this;
  },

  /**
   * start executing the job in the queue
   *
   * @private
   */
  start: function () {
    this.running = true;
    this.next(false);
  },

  /**
   * Mark the current job as finished and call the next in queue
   *
   * @public
   */
  success: function () {
    this.next(false);
  },

  /**
   * This marks the current as finished with an error then calls the next job in queue
   *
   * @public
   * @param  {Object} err
   */
  fail: function (err) {
    err = err || 'Job failed';
    this.next(err);
  },

  /**
   * Run the next job in queue
   *
   * @private
   * @param  {Object} err
   */
  next: function (err) {
    if (this.jobs.length) {
      var job = this.jobs.shift();
      try {
        job(err, this);
      } catch (e) {
        this.next(e);
      }
    } else {
      this.running = false;
    }
  }
};

module.exports = AsyncQueue;
