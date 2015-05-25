# Notesy-client

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [CouchDB](http://couchdb.apache.org/) running on http://localhost:5984
* [Notesy API](https://github.com/appleton/notesy-api) running on http://localhost:1337

## Installation

```bash
$ git clone git@github.com:appleton/notesy.git
$ cd notesy
$ npm install
$ bower install
```

## Running / Development

```bash
$ npm start
```
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

```bash
$ git remote add heroku //git.heroku.com/scribly.git
$ git push heroku master
```
