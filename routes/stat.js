'use strict';

module.exports = function (db) {
    return function (req, res, next) {
        var guests = db.collection('guests');

        guests.find().sort({primary: 1, fio: 1}).toArray(function (err, docs) {
            if (err) {
                next(err);
                return;
            }

            var totalRegistered = 0;
            var guests = {};

            docs.forEach(function (guest) {
                if (guest.register_date) {
                    totalRegistered += 1;
                }

                if (guest.primary) {
                    guest.primary = guests[guest.primary].fio;
                }

                guests[guest._id] = guest;
            });

            docs.sort(function (a, b) {
                return a.fio.localeCompare(b.fio);
            });

            res.render('stat', {
                docs: docs,
                guests: guests,
                totalRegistered: totalRegistered
            });
        });
    };
};
