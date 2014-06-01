var express = require('express'),
    app = express();


require('./configs/appConfig')(app);
require('./routes')(app);


module.exports = app;
