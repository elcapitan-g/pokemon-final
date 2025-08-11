const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

//router.get('/', (req, res) => {
    //#sagger.tage['Hello Shark World']
  //res.send('Hello Shark World');
//});

router.use('/sharks', require('./sharks'));
router.use('/attacks', require('./attacks'));

router.get('/login', passport.authenticate('github'), (req, rest) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
