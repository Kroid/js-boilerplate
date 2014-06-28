var fs = require('fs');

var db = '',
    user = '',
    password = '';


var Sequelize = require('sequelize'),
    sequelize = new Sequelize(db, user, password, {
      dialect: 'sqlite',
      storage: __dirname + '/../../db.sqlite'
    });




function DB(Sequelize, sequelize) {
  this.models = {};
  this.Sequelize = Sequelize;
  this.sequelize = sequelize;
};

/* Synchronization models and connect to database */
DB.prototype.connect = function(forceSync, cb) {
  var sequelize = this.sequelize;

  sequelize
    .sync({force: !!forceSync})
    .complete(function(err) {
      if (!!err) {
        console.log('An error occurred while creating the table: ', err)
      } else {
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
    });

};

/* get model by name */
DB.prototype.model = function(name) {
  return models[name];
};

/* Require all models from path && add its to db.models */
DB.prototype.requireModels = function(path) {
  var db = this;
  iterate(path);

  function iterate(path) {
    var names = fs.readdirSync(path);

    for (var i = 0; i < names.length; i++) {
      var name = names[i];

      if ( fs.statSync(path + '/' + name).isDirectory() ) {
        iterate(path + '/' + name);
      }

      if ( fs.statSync(path + '/' + name).isFile() ) {
        var endPos = name.lastIndexOf('.js');
        if (name.length == endPos + '.js'.length) {
          require(path + '/' + name)(db);
        }
      }

    }

  }
};


var Instance = new DB(Sequelize, sequelize);
Instance.requireModels(__dirname + '/../models');


module.exports = Instance;
