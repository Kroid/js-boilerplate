module.exports = {
  create: function(req, res, next) {
    res.send('cat:create');},

  list: function(req, res, next) {
    res.send('cat:list');},

  update: function(req, res, next) {
    res.send('cat:update');}
}
