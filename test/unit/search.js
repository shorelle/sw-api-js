/*
 * Get search tests
 */

 module.exports = (function() {

  describe('search with exact result', function() {
    it('returns an array with a single object', function() {
      return expect(swapi('people', 'Anakin Skywalker'))
        .to.eventually.be.an('Array')
        .and.have.length(1)
        .and.have.deep.instanceOf(Object);
    });

    it('returns relevant object', function() {
      return expect(swapi('people', 'Anakin Skywalker'))
        .to.eventually.have.deep.property('[0].name', 'Anakin Skywalker');
    });
  });

  describe('search with multiple results', function() {
    it('returns an array of objects', function() {
      return expect(swapi('people', 'skywalker'))
        .to.eventually.be.an('Array')
        .and.have.length.above(1)
        .and.have.deep.instanceOf(Object);
    });

    it('returns relevant objects', function() {
      expect(swapi('people', 'skywalker'))
        .to.eventually.have.deep.property('[0].name', 'Luke Skywalker');
      expect(swapi('people', 'skywalker'))
        .to.eventually.have.deep.property('[1].name', 'Anakin Skywalker');
      expect(swapi('people', 'skywalker'))
        .to.eventually.have.deep.property('[2].name', 'Shmi Skywalker');
        return;
    });
  });

  describe('search with no results', function() {
    it('returns an empty array', function() {
      return expect(swapi('people', 'invalid search term'))
        .to.eventually.be.an('Array').and.be.empty;
    });
  });

})();
  