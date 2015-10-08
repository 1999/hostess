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
                fio: escape(person[0] + ' ' + person[1]),
                company: escape(person[2]),
                category: escape(person[3])
            };
        });
        console.log('allPersons', allPersons.length);
        callback(null, allPersons);
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

            guestsCollection.remove();
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
