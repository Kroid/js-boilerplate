/* Great idea - split requests by api version:
 * 'host.domain/api/v1/:apiParams'
 * 'host.domain/api/v2/:apiParams' */

var router = require('express').Router();

router.get('/', function(req, res) {
  res.send('coming soon');
})

module.exports = router;
