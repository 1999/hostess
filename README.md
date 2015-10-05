# hostess

## URLs

* `/` - поле для ввода имени и фамилии
* `/guest/%uid%` - форма регистрации гостя с плюсадинами
* `/stat` - статистика количества зарегистрированных
* `/find` - ajax-URL для поиска гостей по имени или фамилии
* `/upload` - обновить базу гостей
* `/register` - страница регистрации новых гостей

## Schema

БД - sveta
Collection - guests
Indexes: `db.guests.createIndex({firstname: 'text', lastname: 'text'}, {default_language: 'ru'})`
