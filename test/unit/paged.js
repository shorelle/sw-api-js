/*
 * Get paged resource tests
 */

module.exports = (function() {

  describe('paged people', function() {
    it('returns paged object', function() {
      return expect(swapi('people', 1, 'paged'))
        .to.eventually.be.an('object')
        .and.have.any.keys('count','results');
    });
  });

  describe('paged planets', function() {
    it('returns paged object', function() {
      return expect(swapi('planets', 1, 'paged'))
        .to.eventually.be.an('object')
        .and.have.any.keys('count','results');
    });
  });

  describe('paged species', function() {
    it('returns paged object', function() {
      return expect(swapi('species', 1, 'paged'))
        .to.eventually.be.an('object')
        .and.have.any.keys('count','results');
    });
  });

  describe('paged starships', function() {
    it('returns paged object', function() {
      return expect(swapi('starships', 1, 'paged'))
        .to.eventually.be.an('object')
        .and.have.any.keys('count','results');
    });
  });

  describe('paged vehicles', function() {
    it('returns paged object', function() {
      return expect(swapi('vehicles', 1, 'paged'))
        .to.eventually.be.an('object')
        .and.have.any.keys('count','results');
    });
  });

  describe('paged films', function() {
    it('returns paged object', function() {
      return expect(swapi('films', 1, 'paged'))
        .to.eventually.be.an('object')
        .and.have.any.keys('count','results');
    });
  });

})();