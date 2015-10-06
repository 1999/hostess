'use strict';

module.exports = function (db) {
    return function (req, res, next) {
        var guests = db.collection('guests');

        guests.find().sort({fio: 1}).toArray(function (err, docs) {
            if (err) {
                next(err);
                return;
            }

            res.render('stat', {guests: docs});
        });
    };
};
