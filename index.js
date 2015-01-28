/**
 * Session extension allows to use Redis sessions.
 * No another types of sessions needed for now:
 *      In-memory session is not usable because after restarting server
 *      it is not saved..
 *      Another session storages are not usable in enterprise-scaled apps
 */

module.exports.extension = function() {
    "use strict";

    var app = twee.getApplication()
        , self = this;

    if (!twee.getConfig('twee:extension:twee-session:enabled')) {
        return;
    }

    var session = require('express-session')
        , RedisStore = require('connect-redis')(session);

    var sessionOptions = twee.getConfig('twee:extension:twee-session:options')
        , redisClient = twee.getApplication().get('redis');

    if (!redisClient) {
        throw new Error('Dependency: redis client has not been installed, but required');
    }

    sessionOptions.store = new RedisStore({client: redisClient});
    app.use(session(sessionOptions));

    // Handle Session Connection Troubles
    app.use(function (req, res, next) {
        if (!req.session) {
            self.error('Session Connection Trouble!');
        }
        next();
    });
};

module.exports.dependencies = {
    // First we need to parse cookies
    "Cookies": {
        "module": "twee-cookies-extension"
    },

    // And also redis client should be ready for use
    "Redis Cache": {
        "module": "twee-cache-extension/redis"
    }
};

module.exports.configNamespace = 'twee-session';
module.exports.config = {
    "enabled": true,
    "options": {
        "secret": "expR3ssS3cR3TASD:Fwfk%$^$%&*&",
        "cookie": {
            "secure": false,
            "maxAge": 999999999999,
            "signed": true,
            "path": "/"
        },
        "resave": true,
        "saveUninitialized": true
    }
};
