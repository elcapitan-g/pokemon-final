const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

//router.get('/', (req, res) => {
    //#sagger.tage['Gotta catch em all!']
  //res.send('Gotta cathc em all');
//});

router.use('/cards', require('./cards'));
router.use('/masterSets', require('./masterSets'));

router.get('/login', passport.authenticate('github'), (req, rest) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
