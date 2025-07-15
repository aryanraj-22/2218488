const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const auth = require('./utils/tokenValidator');
const shortUrlRoutes = require('./routes/shortUrls');

app.use(express.json());
app.use(logger);
app.use(auth);
app.use('/shorturls', shortUrlRoutes);

module.exports = app;
