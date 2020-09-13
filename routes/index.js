var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const passport = require('passport');
var userModule=require('../modules/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// Sing In
router.post('/singin', function(req, res, next) {
  var email=req.body.email;
  var password=req.body.password;

  password =bcrypt.hashSync(req.body.password,10)
  var userDetails= new userModule({
    email:email,
    password:password,
  });
  userDetails.save((err,doc)=>{
    if(err) throw err;
    res.redirect('/')
  })
});

// Login
// router.post('/', function(req, res, next) {
//   var email=req.body.email;
//   var password=req.body.password;
//   var checkUser=userModule.findOne({email:email});
//   checkUser.exec((err, data)=> {
//     if(err) throw err;
    
//     var getPassword=data.password;
//     if(bcrypt.compareSync(password,getPassword)){
//       res.redirect('/dashboard');
//     }else {
//       req.flash('success_msg', "Password Invalide" )
//       res.redirect('/');
//     }

//   })
  
// });


// Login
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});



module.exports = router;
