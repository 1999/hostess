'use strict';

var mongodb = require('mongodb');

module.exports = function (db) {
    return function (req, res, next) {
        var guests = db.collection('guests');

        guests.insertOne({
            fio: req.body.fio,
            company: req.body.company,
            category: req.body.category,
            register_date: new Date
        }, function (err, r) {
            if (err) {
                next(err);
                return;
            }

            res.redirect('/stat#' + r.insertedId);
        });
    };
};
