const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isLoggedIn = require('../middlewares/isAuthenticated.js')

router.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('profile', {
    title: 'Profile Page'
   })
})

router.get('/main', isLoggedIn, (req, res, next) => {
  res.render('main', {
    title: 'Main Page'
    })
})

router.get('/private', isLoggedIn, (req, res, next) => {
  res.render('private', {
    title: 'Private Page'
    })
})

module.exports = router