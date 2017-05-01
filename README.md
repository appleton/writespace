# Writespace

[![Codeship](https://codeship.com/projects/bf548700-d884-0133-d34e-5e1dcb628de7/status?branch=master)](https://codeship.com/projects/143225)

*This is a side project which is now unmaintained. I'm leaving it here as an example of an Ember.js app which uses PouchDB and service workers to work offline.*

---

Writespace is an offline capable Ember.js note taking app.

* It uses [PouchDB](https://pouchdb.com/) to cache data in the browser and syncs to a [CouchDB](http://couchdb.apache.org/) backend.
* It uses a service worker to cache code and session data in the browser so it works offline.
* It uses a separate [API server](https://github.com/appleton/writespace-api) to handle user signup and password resets.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [CouchDB](http://couchdb.apache.org/) running on http://localhost:5984
* [Writespace API](https://github.com/appleton/writespace-api) running on http://localhost:1337

## Installation

```bash
$ git clone git@github.com:appleton/writespace.git
$ cd writespace
$ npm install
$ bower install
```

## Running / Development

```bash
$ npm start
```
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Building

* `ember build` (development)
* `ember build --environment production` (production)

## Deploying

```bash
$ heroku create
$ git push heroku master
```
