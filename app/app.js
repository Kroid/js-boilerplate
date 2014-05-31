var express = require('express'),
    app = express();



require("./configs/appConfig")(app);

var apiRoutes = require('./helpers/createRoutes');


app.use('/api', apiRoutes);


/* All request (without static files) will send to angular app
 * for angular routing and html5 history */
app.get(function(req, res) {
  res.render('index');
});




//require('./routes')(app);





module.exports = app;
