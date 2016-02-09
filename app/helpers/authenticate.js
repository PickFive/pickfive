module.exports = (req, res, next) => {
  console.log('Checking authentication');
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
}
