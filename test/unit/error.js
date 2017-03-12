/*
 * Get error tests
 */

 module.exports = (function() {

  describe('invalid all resources', function() {
    it('returns a Not Found error', function() {
      return expect(swapi('invalid-resource'))
        .to.be.rejectedWith(Error, 'Not Found');
    });
  });

  describe('invalid single resource', function() {
    it('returns a Not Found error', function() {
      return expect(swapi('invalid-resource', 1))
        .to.be.rejectedWith(Error, 'Not Found');
    });
  });

  describe('path with invalid type', function() {
    it('returns a type error', function() {
      return expect(swapi({}))
        .to.be.rejectedWith(TypeError, 'Path must be a string.');
    });
  });

  describe('value with invalid type', function() {
    it('returns a type error', function() {
      return expect(swapi('people', {}))
        .to.be.rejectedWith(TypeError, 'Value must be a string or number.');
    });
  });

  describe('format not equal to paged', function() {
    it('returns an error with invalid message', function() {
      return expect(swapi('people', 1, 'invalid format value'))
        .to.be.rejectedWith(Error, 'Invalid format parameter.');
    });
  });

})();
  