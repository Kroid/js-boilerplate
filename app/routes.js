var rest = require('express-rest-generate'),
    restConfig = require(__dirname + '/configs/rest.json'),
    router = rest(__dirname, restConfig);


module.exports = function(app) {
    // auto-generate routes
    app.use('/api', router);


    /* All request (without static files) will send to angular app
     * for angular routing and html5 history */
    if ( 'production' == app.get('env') ) {
      app.use(function(req, res) {
        res.render('production/index');
      });
    }

    if ( 'development' == app.get('env') ) {
      app.use(function(req, res) {
        //res.render('development/index');
        res.render('production/index');
      });
    }
}