var api = require('./api');


module.exports = function(app){
  app.use('/api', api);

  app.use(function(req,res){
    res.render('index');
  });
}
