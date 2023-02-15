const express = require('express')
const router = express.Router()

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Home Page'
  })
})

router.use('/', require('./auth.routes'))
router.use('/', require('./user.routes'))


module.exports = router