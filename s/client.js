(function () {
    'use strict';

    var plusOneForm = '<div class="plusoneguestform">\
        <h3>+1 гость</h3>\
        <div class="form-group">\
            <input type="text" name="fio" class="form-control" placeholder="Фамилия Имя" required>\
        </div>\
        <div class="form-group">\
            <input type="text" name="company" class="form-control" placeholder="Компания">\
        </div>\
        <div class="form-group">\
            <input type="text" name="category" class="form-control" placeholder="Категория">\
        </div>\
    </div>';

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
                    matches.push(guest);
                }
            });

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
            display: function (guest) {
                return guest.registered
                    ? guest.fio + ' (зарегистрирован)'
                    : guest.fio;
            },
            templates: {
                empty: '&nbsp;&nbsp;Гостя с таким ФИО нет',
                // suggestion: Handlebars.compile('<div><strong>{{value}}</strong> – {{year}}</div>')
            }
        }).bind('typeahead:select', function (ev, guest) {
            location.href = '/guest/' + guest.id;
        });
    }

    var registerForm = $('.register');
    if (registerForm.length) {
        $('.plusone').bind('click', function () {
            registerForm.prepend(plusOneForm);
        });
    }
})();
