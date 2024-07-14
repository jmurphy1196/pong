const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes')

const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use(helmet());

app.use(routes);

module.exports = {
    app
}

