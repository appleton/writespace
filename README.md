# Writespace

[![Codeship](https://codeship.com/projects/bf548700-d884-0133-d34e-5e1dcb628de7/status?branch=master)](https://codeship.com/projects/143225)

Writespace is an Ember.js note taking app.

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
$ git remote add heroku https://git.heroku.com/writespace.git
$ git push heroku master
```
