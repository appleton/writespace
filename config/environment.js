/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'writespace',
    podModulePrefix: 'writespace/pods',
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

    'ember-simple-auth': {
      authenticationRoute: 'user.login',
      routeAfterAuthentication: 'notes',
      routeIfAlreadyAuthenticated: 'notes'
    },

    'ember-cli-notifications': {
      includeFontAwesome: true
    },

    mixpanel: {
      enabled: (environment === 'production'),
      LOG_EVENT_TRACKING: process.env.LOG_EVENT_TRACKING || false,
      token: process.env.MIXPANEL_TOKEN
    },

    contentSecurityPolicy: {
      'default-src': "'self'; img-src 'self' data: ; style-src 'self' 'unsafe-inline'",
      'child-src': 'blob:'
    },

    serviceWorker: {
      enabled: true,
      debug: process.env.LOG_SERVICE_WORKER || false,
      precacheURLs: [],
      excludePaths: ['test.*', 'robots.txt'],
      includeRegistration: true,
      skipWaiting: true
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.COUCH_URL = process.env.COUCH_URL || 'http://localhost:5984';
    ENV.API_URL = process.env.API_URL || 'http://localhost:1337';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.COUCH_URL = '/db';
    ENV.API_URL = '/api';
  }

  if (environment === 'production') {
    ENV.COUCH_URL = process.env.COUCH_URL || 'https://db.notesy.co';
    ENV.API_URL = process.env.API_URL || 'https://api.writespace.it';
  }

  ENV.contentSecurityPolicy['connect-src'] = [
    "'self'",
    'api.mixpanel.com',
    ENV.COUCH_URL,
    ENV.API_URL
  ].join(' ');

  ENV.serviceWorker.dynamicCache = [
    {
      route: '/_session',
      options: { origin: ENV.COUCH_URL }
    },
    {
      route: '/_users/*',
      options: { origin: ENV.COUCH_URL }
    }
  ];


  return ENV;
};
