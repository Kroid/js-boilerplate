var app = require('./app/app');


function startServer() {
  app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
  })
}


/* db.connect(forceSync, callback) */
app.get('db').connect(true, startServer);
