module.exports = {
  create: function(req, res, next) {
    res.send('object:create');
  },

  show: function(req, res, next) {
    res.send('object:show:' + req.params.id);
  }
}
