'use strict';

const https = require('https');
const path = require('path');
const fs = require('fs');

const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const Logger = require('morgan');

const mainRouter = require('./routes/main.router');
const apiRouter = require('./routes/api.router');

const app = express();

const DEV_PORT = require('./config/config').dev_port;
const PORT = process.env.port || DEV_PORT;

// specifying port , server is running on localhost~127.0.0.1 by default
https.createServer({
    key: fs.readFileSync('cert/server.key'),
    cert: fs.readFileSync('cert/server.cert')
}, app).listen(PORT);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(Logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use('/', mainRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
