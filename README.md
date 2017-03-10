# sw-api-js
Simple [Star Wars API](http://swapi.co) Javascript wrapper for Node and the browser. **Testing still in progress!**
* Supports API search and getting all resource entries
* Uses native ES6 Promises
* Node v0.10.0+
* Includes polyfill for older browsers

## Getting started

### Node
Install with npm:
```
// TO-DO: module to be published
```
Include the module (or `import swapi from 'sw-api-js'` in ES6):
```javascript
var swapi = require('sw-api-js');

swapi('people').then( function(data) {
    // ... Do the things
  }).catch( function(err) {
    // ... Handle errors
  });
```

### Browser
Download the [browserified script](lib/swapi.browser.js) and add with script tag:
```html
 <script src="path/to/file/swapi.browser.js"></script>
```
Then call the module as usual:
```javascript
swapi('people').then( function(data) {
        // ... Do the things
    }).catch( function(err) {
        // ... Handle errors
    });
```

## Methods
This wrapper is designed to be simple and flexible. All endpoints can be passed through as parameters to `swapi()` (for future compability if new endpoints are added, etc) and will return a JSON object or array of objects.
### Direct URL
Resources can be called directly with a full URL:
```javascript
swapi('http://swapi.co/api/people/17').then(...)
```
### All
Get all entries from a resource (available resources are `films`,  `people`, `planets`, `species`, `starships` and `vehicles`) with the resource parameter:
```javascript
swapi('people').then(...)
```
### Single
Add an ID parameter to get a single entry from a resource.
```javascript
swapi('people', 1).then(...)
```
### Paged
Add `'paged'` parameter to get paginated entries by type. The ID value is the page number to call. The endpoint URLs to the next/previous page will be in the `data.next` and `data.previous` fields.
```javascript
swapi('people', 1, 'paged').then(...)
```
### Search
To get resource entries by name instead of ID (useful!) use a string as the value to call the SWAPI search feature (documentation [here](http://swapi.co/documentation#search)). You can get entries by their full name:
```javascript
swapi('people', 'Anakin Skywalker').then(...)
```
Or a partial string to return all matches:
```javascript
swapi('people', 'anakin').then(...)
```
### Root
Calling the function with no parameters will default to the base URL and return a list of all available resources on the API.
```javascript
swapi().then(...)
```
**Response:**
```javascript
{
    "films": "http://swapi.co/api/films/",
    "people": "http://swapi.co/api/people/",
    "planets": "http://swapi.co/api/planets/",
    "species": "http://swapi.co/api/species/",
    "starships": "http://swapi.co/api/starships/",
    "vehicles": "http://swapi.co/api/vehicles/"
}
```
## To-Do
Tests and documentation!