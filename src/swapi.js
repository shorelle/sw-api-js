require('core-js/es6/promise'); // Polyfill for backwards compatibility
const request = require('superagent');

(function() {

  const HOST = 'http://swapi.co/api/'; 

  /*
   * Request data from SW API
   */
  function getData(url) {
    return new Promise( (resolve, reject) => {
      request.get(url)
        .responseType('json')
        .type('application/json')
        .accept('application/json')
        .end( (err, res) => {
          if (err) {
            reject(throwError('Error: ' + err + ' for ' + url));
          } else {
            resolve(res.body);
          }
        });
    });
  }

  /*
   * Recursive function to get objects from all pages
   */
  function getAll(url, collection) {
    // Initialise array
    collection = (typeof collection === 'undefined') ? [] : collection;

    return getData(url)
      .then( data => {
        // Add each item to array
        let length = data.results.length;
        for (let i = 0; i < length; ++i) {
          collection.push(data.results[i]);
        }

        if (data.next === null) { // Return on final page
          return collection;
        } else {
          return getAll(data.next, collection);
        }
      })
      .catch( err => {
        return throwError('Recursive ' + err);
      });
  }

  /*
   * Convert parameters for API
   */
  function parseOptions(options) {
    if (options.path.indexOf(HOST) !== -1) { 
      // Get complete URL
      return getData(options.path);
    } else if (typeof options.value === 'undefined') { 
      // Get all results
      return getAll(HOST + options.path + '/');
    } else if (typeof options.value === 'string') { 
      // Get search results (paged or all)
      if (options.format === 'paged') {            
        return getData(HOST + options.path + '/?search=' + options.value);
      } else {
        return getAll(HOST + options.path + '/?search=' + options.value);
      }
    } else { 
      // Get results by ID (paged or single)
      if (options.format === 'paged') {
        return getData(HOST + options.path + '/?page=' + options.value);
      } else {                         
        return getData(HOST + options.path + '/' + options.value);
      }
    }
  }

  /*
   * Sanitize input parameter types and reject Promise if invalid
   */
  function sanitizeOptions(options) {
    // Set to base URL on empty parameters
    options.path = (typeof options.path === 'undefined') ? HOST : options.path;

    if (typeof options.path !== 'string') {
      // Reject if input path isn't a string
      return Promise.reject(throwError('Path must be a string.'));
    } else if (typeof options.value !== 'undefined' && 
        ((typeof options.value !== 'string' && typeof options.value !== 'number') || 
        (typeof options.value === 'number' && options.value%1 !== 0))) {
      // Reject if input value isn't a string or integer
      return Promise.reject(throwError('Value must be a string or number.'));
    } else if (typeof options.format !== 'undefined' && options.format !== 'paged') {
      // Reject if input format is invalid
      return Promise.reject(throwError('Invalid format parameter.'));
    } else {
      // All is well, continue!
      return parseOptions(options);
    }
  }

  /*
   * Helper function for Promise errors
   */
  function throwError(message) {
    return new Error(message);
  }

  /*
   * Export the module
   */
  const swapi = function(path, value, format) {
    return sanitizeOptions({path, value, format});
  }

  module.exports = swapi;

})();