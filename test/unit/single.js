/*
 * Get single resource tests
 */

 module.exports = (function() {

  describe('person', function() {
    it('returns the person object', function() {
      return expect(swapi('people', 1))
        .to.eventually.be.an('object')
        .and.have.property('name', 'Luke Skywalker');
    });
  });

  describe('planet', function() {
    it('returns the planet object', function() {
      return expect(swapi('planets', 1))
        .to.eventually.be.an('object')
        .and.have.property('name', 'Tatooine');
    });
  });

  describe('species', function() {
    it('returns the species object', function() {
      return expect(swapi('species', 1))
        .to.eventually.be.an('object')
        .and.have.property('name', 'Human');
    });
  });

  describe('starship', function() {
    it('returns the starship object', function() {
      return expect(swapi('starships', 2))
        .to.eventually.be.an('object')
        .and.have.property('name', 'CR90 corvette'); // starships/1 does not exist
    });
  });

  describe('vehicle', function() {
    it('returns the vehicle object', function() {
      return expect(swapi('vehicles', 4))
        .to.eventually.be.an('object')
        .and.have.property('name', 'Sand Crawler'); // vehicles/1,2,3 do not exist
    });
  });

  describe('film', function() {
    it('returns the film object', function() {
      return expect(swapi('films', 1))
        .to.eventually.be.an('object')
        .and.have.property('title', 'A New Hope');
    });
  });

})();
  