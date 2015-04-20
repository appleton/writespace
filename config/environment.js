/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'notesy-client',
    podModulePrefix: 'notesy-client/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'simple-auth': {
      authenticationRoute: 'user.login',
      routeAfterAuthentication: 'notes',
      routeIfAlreadyAuthenticated: 'notes'
    },

    contentSecurityPolicy: {
      'default-src': "'self'; img-src 'self' data:"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.COUCH_URL = 'http://localhost:5984';
    ENV.API_URL = 'http://localhost:1337';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.COUCH_URL = process.env.COUCH_URL;
    ENV.API_URL = 'https://api.notesy.co';
  }

  ENV.contentSecurityPolicy['connect-src'] = "'self' " + ENV.COUCH_URL + ' ' + ENV.API_URL;

  return ENV;
};
