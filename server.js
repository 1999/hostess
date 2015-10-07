'use strict';

var os = require('os');
var bodyParser = require('body-parser');
var express = require('express');
var exphbs = require('express-handlebars');
var mongodb = require('mongodb');
var multer = require('multer');
var serveStatic = require('serve-static');

function configure(app) {
    app.set('env', process.env.NODE_ENV);
    app.disable('x-powered-by');
    app.disable('etag');
    app.set('trust proxy', 1);
    app.set('case sensitive routing', true);

    app.engine('.hbs', exphbs({
        defaultLayout: __dirname + '/views/main',
        extname: '.hbs'
    }));

    app.set('views', __dirname + '/views');
    app.set('view engine', '.hbs');

    if (process.env.NODE_ENV !== 'production') {
        app.disable('view cache');
        app.use(serveStatic('./'));
    } else {
        app.enable('view cache');
    }
}

function useMiddleware(app, db) {
    var postRequestOptions = {limit: '15mb', extended: false};
    var postRequestDecodeMiddleware = bodyParser.urlencoded(postRequestOptions);
    var uploadFilesDecodeMiddleware = multer({dest: os.tmpdir(), inMemory: true});

    app.get('/', require('./routes/index')(db));

    app.get('/guest/:uid', require('./routes/guest-by-uid')(db));
    app.post('/guest/:uid', postRequestDecodeMiddleware, require('./routes/register-guest')(db));
    app.get('/registered/:uid', require('./routes/registered-by-uid')(db));

    app.get('/stat', require('./routes/stat')(db));

    app.get('/upload', require('./routes/upload-form'));
    app.post('/upload', postRequestDecodeMiddleware, uploadFilesDecodeMiddleware.single('excel'), require('./routes/upload-processor')(db));

    app.get('/register', require('./routes/register-form'));
    app.post('/register', postRequestDecodeMiddleware, require('./routes/register-processor')(db));

    app.use(require('./errorhandler'));
}

mongodb.MongoClient.connect('mongodb://localhost:27017/sveta', function (err, db) {
    if (err) {
        throw err;
    }

    var app = express();
    configure(app);
    useMiddleware(app, db);

    app.listen(3000).on('close', function () {
        console.log('Server is closing...');
        db.close();
    });
});
