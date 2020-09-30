var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', {title: 'Hello, World!'});
});

/*GET userlist page */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

/*GET new user page*/
router.get('/newuser', function(req, res) {
  res.render('newuser', {title: 'Add new user'});
})

module.exports = router;
