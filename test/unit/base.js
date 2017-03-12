/*
 * Unit tests for base URL
 */

module.exports = (function() {

  describe('base URL', function() {
    it('returns an object with resource keys', function() {
      return expect(swapi())
      .to.eventually.be.an('object')
      .and.have.keys('people','planets','species','starships','vehicles','films');
    });
  });

})();