'use strict';

var mongodb = require('mongodb');

module.exports = function (db) {
    return function (req, res, next) {
        var guests = db.collection('guests');

        guests.find({
            _id: mongodb.ObjectID(req.params.uid)
        }).next(function (err, guest) {
            if (err) {
                next(err);
                return;
            }

            res.render('guest', {guest: guest});
        });
    };
};
