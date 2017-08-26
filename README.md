# hostess

[![Greenkeeper badge](https://badges.greenkeeper.io/1999/hostess.svg)](https://greenkeeper.io/)

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

### Импорт данных для БД
```javascript
npm run-script init-db
```

`npm start`
