var express = require('express');
const { create} = require('./controller')
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/', function(req, res, next) {
  res.render('index', {title: 'TEST'});
});
router.get('/addobject', create)

module.exports = router;
