var fs = require('fs');
var mongodb = require('mongodb');
var xlsx = require('node-xlsx');
var escape = require('escape-html');

function getList(num, callback) {
    var lists = xlsx.parse(__dirname + '/guests.xlsx');
    callback(null, lists[num].data.filter(function (row) {
        row.forEach(function (cell, i) {
            row[i] = escape(cell.toString());
        });
        return row.length;
    }));
}

function handleErr(err) {
    console.log(err);
    return err;
}

function getAllGuests (callback) {
    var allPersons;

    getList(0, function (err, persons) {
        if (err) {
            return callback(err);
        }

        allPersons = persons.map(function (person) {
            return {
                company: 'Яндекс',
                fio: person[1],
                email: person[2],
                city: person[3],
                plusone: person[4]
            };
        });

        getList(1, function (err, persons) {
            if (err) {
                return callback(err);
            }

            allPersons = allPersons.concat(persons.map(function (person) {
                return {
                    company: person[0],
                    fio: person[1],
                    position: person[2],
                    email: person[3],
                    phone: person[4],
                    comment: person[5],
                    plusone: person[6]
                };
            }));
            callback(null, allPersons);
        });
    });
}

getAllGuests(function (err, guests) {
    if (err) {
        throw handleErr(err);
    }

    mongodb.MongoClient.connect('mongodb://localhost:27017/sveta', function (err, db) {
        if (err) {
            throw handleErr(err);
        }

        var guestsCollection = db.collection('guests');
        db.createCollection('guests', function (err) {
            if (err) {
                throw handleErr(err);
            }

            guestsCollection.drop(function (err) {
                if (err) {
                    throw handleErr(err);
                }

                guestsCollection.insert(guests, function (err) {
                    if (err) {
                        throw handleErr(err);
                    }

                    db.close();
                });
            });
        });
    });
});
