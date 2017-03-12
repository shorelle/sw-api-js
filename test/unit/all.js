/*
 * Get all resource tests
 */

 module.exports = (function() {

  describe('all people', function() {
    this.timeout(20000);

    it('returns an array of objects', function() {
      return expect(swapi('people'))
        .to.eventually.be.an('Array').and.have.deep.instanceOf(Object);
    });

    it('returns a person', function() {
      return expect(swapi('people'))
        .to.eventually.have.deep.property('[0].height');
    });
  });

  describe('all planets', function() {
    this.timeout(10000);

    it('returns an array of objects', function() {
      return expect(swapi('planets'))
        .to.eventually.be.an('Array').and.have.deep.instanceOf(Object);
    });

    it('returns a planet', function() {
      return expect(swapi('planets'))
        .to.eventually.have.deep.property('[0].rotation_period');
    });
  });

  describe('all species', function() {
    this.timeout(10000);

    it('returns an array of objects', function() {
      return expect(swapi('species'))
        .to.eventually.be.an('Array').and.have.deep.instanceOf(Object);
    });

    it('returns a species', function() {
      return expect(swapi('species'))
        .to.eventually.have.deep.property('[0].classification');
    });
  });

  describe('all starships', function() {
    this.timeout(10000);

    it('returns an array of objects', function() {
      return expect(swapi('starships'))
        .to.eventually.be.an('Array').and.have.deep.instanceOf(Object);
    });

    it('returns a starship', function() {
      return expect(swapi('starships'))
        .to.eventually.have.deep.property('[0].starship_class');
    });
  });

  describe('all vehicles', function() {
    this.timeout(10000);

    it('returns an array of objects', function() {
      return expect(swapi('vehicles'))
        .to.eventually.be.an('Array').and.have.deep.instanceOf(Object);
    });

    it('returns a vehicle', function() {
      return expect(swapi('vehicles'))
        .to.eventually.have.deep.property('[0].vehicle_class');
    });
  });

  describe('all films', function() {
    this.timeout(10000);

    it('returns an array of objects', function() {
      return expect(swapi('films'))
      .to.eventually.be.an('Array').and.have.deep.instanceOf(Object);
    });

    it('returns a film', function() {
      return expect(swapi('films'))
        .to.eventually.have.deep.property('[0].episode_id');
    });
  });

})();
  