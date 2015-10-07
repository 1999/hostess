'use strict';

var mongodb = require('mongodb');

module.exports = function (db) {
    return function (req, res, next) {
        var guests = db.collection('guests');
        var bulkOps = [];

        guests.find({
            _id: mongodb.ObjectID(req.params.uid)
        }).next(function (err, guest) {
            if (err) {
                next(err);
                return;
            }

            bulkOps.push({
                updateOne: {
                    filter: {_id: guest._id},
                    update: {'$set': {register_date: new Date}}
                }
            });

            if (req.body.fio) {
                if (!Array.isArray(req.body.fio)) {
                    req.body.fio = [req.body.fio];
                    req.body.company = [req.body.company];
                    req.body.category = [req.body.category];
                }

                req.body.fio.forEach(function (fio, index) {
                    bulkOps.push({
                        insertOne: {
                            'document': {
                                fio: fio,
                                company: req.body.company[index],
                                category: req.body.category[index],
                                register_date: new Date
                            }
                        }
                    });
                });
            }

            guests.bulkWrite(bulkOps, function (err, r) {
                if (err) {
                    next(err);
                    return;
                }

                res.redirect('/registered/' + req.params.uid);
            });
        });
    };
};
