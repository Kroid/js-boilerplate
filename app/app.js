var express = require('express'),
    app = express();


require('./configs/app')(app);
require('./routes')(app);


module.exports = app;
