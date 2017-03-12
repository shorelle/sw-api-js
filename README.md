# sw-api-js
Simple [Star Wars API](http://swapi.co) Javascript wrapper for Node and the browser. **Testing still in progress!**
* Supports search and retrieving all resources
* Uses native ES6 Promises
* Node v4+
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
```

### Browser
Download the [browserified script](lib/swapi.browser.js) and add with script tag:
```html
 <script src="path/to/file/swapi.browser.js"></script>
```
## Usage
This wrapper is designed to be simple and flexible. All endpoints can be passed through as parameters to `swapi()` and will return an object or array of objects. Use as promise:
```javascript
swapi('your-parameter-here').then( function(data) {
        // ... Do the things
    }).catch( function(err) {
        // ... Handle errors
    });
```
For example, calling the function with a full URL (see other options [below](#options)):
```javascript
swapi('http://swapi.co/api/people/11').then(...)
```
Will return the data object:
```javascript
{
    "name": "Anakin Skywalker", 
    "height": "188", 
    "mass": "84", 
    "hair_color": "blond", 
    "skin_color": "fair", 
    "eye_color": "blue", 
    "birth_year": "41.9BBY", 
    "gender": "male", 
    "homeworld": "http://swapi.co/api/planets/1/", 
    "films": [
        "http://swapi.co/api/films/5/", 
        "http://swapi.co/api/films/4/", 
        "http://swapi.co/api/films/6/"
    ], 
    "species": [
        "http://swapi.co/api/species/1/"
    ], 
    "vehicles": [
        "http://swapi.co/api/vehicles/44/", 
        "http://swapi.co/api/vehicles/46/"
    ], 
    "starships": [
        "http://swapi.co/api/starships/59/", 
        "http://swapi.co/api/starships/65/", 
        "http://swapi.co/api/starships/39/"
    ], 
    "created": "2014-12-10T16:20:44.310000Z", 
    "edited": "2014-12-20T21:17:50.327000Z", 
    "url": "http://swapi.co/api/people/11/"
}
```
## Options
The parameter options are listed below:
### URL
Get resource from full URL:
```javascript
swapi('http://swapi.co/api/people/11').then(...)
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
Browser testing and coverage