var db = 'mydb',
    user = 'postgres',
    password = '';


var Sequelize = require('sequelize'),
    sequelize = new Sequelize(db, user, password, {
      dialect: 'postgres',
      port: 5433  // default postgres port is 5432
    });


module.exports.start = function(cb) {
  sequelize
    .authenticate()
    .complete(function(err) {
      if (!!err) {
        console.log('Unable to connect to the database: ', err);
      } else {
        cb();
      }
    });
}
