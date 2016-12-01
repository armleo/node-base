const Logger = require('../logger');
const logger = new Logger();

let app = new (require('express').Router)();

app.use(require('./auth'));
app.use(require('./home'));
app.use(require('./post'));

module.exports = app;