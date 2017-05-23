'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, log, cb) {
    
    if(intentData.intent[0].value !== 'weather') 
        return cb(new Error('Expected weather intent but got ' + intentData.intent[0].value));

    const location = intentData.location[0].value.replace(/,.?bot\-danjelous/i, '');

    const service = registry.get('weather');
    if(!service) return cb(false, 'No service available');

    request.get(`http://${service.ip}:${service.port}/service/${location}`)
    .then((res) => {
        if(!res.body.result) return cb('Error with weather service');
        return cb(null, `In ${location} the weather is now ${res.body.result}`);
    });

}