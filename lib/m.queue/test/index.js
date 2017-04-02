var should = require('should'),
  AsyncQueue = require('../async-queue');

describe('AsyncQueue', function () {
  describe('#AsyncQueue()', function () {
    it('should init with jobs as params', function () {
      var q = new AsyncQueue(function () {}, function () {});
      q.jobs.should.have.lengthOf(2);
    });
  });

  describe('#add()', function () {
    it('should add job to existing queue', function () {
      var q = new AsyncQueue();
      q.add(function () {});
      q.jobs.should.have.lengthOf(1);
    });

    it('should add multiple jobs to existing queue at the end', function () {
      var q = new AsyncQueue(function () {}),
        f1 = function () {},
        f2 = function () {};

      q.add(f1, f2);
      q.jobs.should.have.lengthOf(3);
      q.jobs[1].should.equal(f1);
      q.jobs[2].should.equal(f2);
    });
  });

  describe('#run()', function () {
    it('should run jobs in order', function (done) {
      var executed = {};

      var q = new AsyncQueue(function (err, job) {
        executed['job1'] = true;
        job.success();
      });

      q.add(function (err, job) {
        executed['job1'].should.be.true;
        executed['job2'] = true;
        job.success();
      },
      function () {
        executed['job1'].should.be.true;
        executed['job2'].should.be.true;
        done();
      }).run();
    });

    it('should not trigger start if running', function () {
      var q = new AsyncQueue(function (err, job) {}).run();
      q.running.should.be.true;
      q.start = function () {
        true.should.be.false;
      };

      q.run();
    });
  });

  describe('#fail()', function () {
    it('should forward errors to next job in queue', function (done) {
      new AsyncQueue(
        function (err, job) {
          job.fail('an error');
        },
        function (err, job) {
          err.should.equal('an error');
          done();
        }).run();
    });
  });
});
