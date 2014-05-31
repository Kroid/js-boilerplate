var app = require('./app/app');


app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
})
