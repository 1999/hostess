(function () {
    'use strict';

    function lowercase(str) {
        return str.toLowerCase();
    }

    /**
     * Find guest by fio
     */
    function substringMatcher(guests) {
        return function findMatches(q, cb) {
            var matches = [];

            guests.forEach(function (guest) {
                var searchParts = q.split(' ').map(lowercase);
                var hasSubstring = searchParts.some(function (searchTerm) {
                    return (guest.fio.toLowerCase().indexOf(searchTerm) !== -1);
                });

                if (hasSubstring) {
                    matches.push(guest.fio);
                }
            });

            console.log(matches.length);
            cb(matches);
        };
    }

    var guestsearch = $('.guestsearch');
    if (guestsearch.length) {
        var guests = guestsearch.data('guests');

        $('#fio').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            source: substringMatcher(guests),
            templates: {
                empty: 'Гостя с таким ФИО нет',
                // suggestion: Handlebars.compile('<div><strong>{{value}}</strong> – {{year}}</div>')
            }
        });
    }
})();
