var api = require('./api');


module.exports = function(app){
  app.use('/api', api);


  /* All request (without static files) will send to angular app
   * for angular routing and html5 history */
  app.get(function(req,res){
    res.render('index');
  });
}
