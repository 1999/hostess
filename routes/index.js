'use strict';

module.exports = function (db) {
    return function (req, res, next) {
        var guests = db.collection('guests');

        guests.find().sort({fio: 1}).toArray(function (err, docs) {
            if (err) {
                next(err);
                return;
            }

            docs = docs.map(function (doc) {
                return {
                    id: doc._id,
                    fio: doc.fio,
                    registered: Boolean(doc.register_date)
                };
            });

            res.render('index', {guests: JSON.stringify(docs)});
        });
    };
};
