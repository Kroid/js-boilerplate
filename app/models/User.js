module.exports = function(db) {
  db.models.User = db.sequelize.define('User', {
    username: db.Sequelize.STRING,
    password: db.Sequelize.STRING
  });
};
