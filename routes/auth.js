const router = require('express').Router();
const passport = require('passport');

// Route to start login with GitHub
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Route to logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});

// GitHub callback route
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

module.exports = router;
