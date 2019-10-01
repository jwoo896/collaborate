const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

//DB setup
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


// Replace with your mongoLab URI
const MONGO_URI = "mongodb+srv://jwoo896:1Asxdcfv@cluster0-s2iyg.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb+srv://jwoo896:1Asxdcfv@cluster0-s2iyg.mongodb.net/test?retryWrites=true&w=majority";

if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(morgan('combined')); //morgan is a logging framework. mostly used for debugging
app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;