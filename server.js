var app = require('./app/app');


function startServer() {
  app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
  })
}


app.get('db').start(startServer);
