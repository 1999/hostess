'use strict';

var http = require('http');
var util = require('util');

module.exports = function Errorhandler(err, req, res, next) {
    if (util.isError(err)) {
        res.end(err.message + '\n' + err.stack);
        return;
    }

    if (typeof err === 'number') {
        res.end(err + ' ' + http.STATUS_CODES[err]);
        return;
    }

    res.end('Uncaught error: ' + err);
};
