var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { config } = require('dotenv');
var cors = require('cors');

var dbConnect = require('./utils/dbConnect.js');
var usersRouter = require('./routes/users.js');
var journalistRouter = require('./routes/journalist.js');
var blogRouter = require('./routes/blogs.js');
// const redisClient = require('./utils/redisConnect.js');

config();
dbConnect();
// redisClient.connect();

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './dist')));

app.use('/users', usersRouter);
app.use('/journalist', journalistRouter);
app.use('/blogs', blogRouter);

app.get('/*', function (_req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'), function (err) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
});

module.exports = app;
