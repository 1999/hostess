# hostess

## URLs

* `/` - поле для ввода имени и фамилии
* `/guest/%uid%` - форма регистрации гостя с плюсадинами
* `/stat` - статистика количества зарегистрированных
* `/find` - ajax-URL для поиска гостей по имени или фамилии
* `/upload` - обновить базу гостей
* `/register` - страница регистрации новых гостей

## Schema

* БД - sveta
* Collection - guests
* Typical document:
```javascript
_id: ...,
fio: 'Иванов Иван Иваныч', // фамилия имя
company: 'Яндекс', // необязательное поле
category: 'whatever', // необязательное поле
register_date: Date // если не зарегистрирован, поля нет
```

## Develop

### Сэмпловые данные для MongoDB
```javascript
db.guests.drop();
db.guests.createIndex({register_date: 1, fio: 1}); // для поиска по ФИО
db.guests.createIndex({fio: 1}); // для вывода статистики

db.guests.insert([
    {fio: 'Островский Анатолий', company: 'Яндекс'},
    {fio: 'Сорин Дмитрий', company: 'Яндекс'},
    {fio: 'Красуля Георгий', company: 'Яндекс'},
    {fio: 'Довыденко Владимир', company: 'Яндекс'},
    {fio: 'Марчук Ирина', company: 'Яндекс'},
    {fio: 'Жуланов Вадим', company: 'Яндекс'},
    {fio: 'Антипов Станислав', company: 'Яндекс'},
    {fio: 'Глушко Вчеслав', company: 'Яндекс'}
]);
```

`npm start`
