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

/*POST so that adds user Service*/
router.post('/adduser', function(req,res){
  //Setting our internal DB variable
  var db = req.db;

  //Get form values, especifically using "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //Setting our collection
  var collection = db.get('usercollection');

  //Submit to the database
  collection.insert({
    "username": userName,
    "email": userEmail
  },
  function (err, doc){
    if(err){
      //If fail, return error
      res.send("We have run into a problem while sending information to our database. Please try again.")
    }
    else{
      //Sending user to the success page
      res.redirect('userlist');
    }
  }
  );
});

module.exports = router;
