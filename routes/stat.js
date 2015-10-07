'use strict';

module.exports = function (db) {
    return function (req, res, next) {
        var guests = db.collection('guests');

        guests.find().sort({fio: 1}).toArray(function (err, docs) {
            if (err) {
                next(err);
                return;
            }

            var totalRegistered = docs.reduce(function (totalRegistered, guest) {
                if (guest.register_date) {
                    totalRegistered += 1;
                }

                return totalRegistered;
            }, 0);

            res.render('stat', {
                guests: docs,
                totalRegistered: totalRegistered
            });
        });
    };
};
