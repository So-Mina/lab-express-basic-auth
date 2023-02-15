const express = require('express')
const User = require('../models/User.model')
const router = express.Router()
const bcrypt = require('bcryptjs')


router.get('/signup', async (req, res, next) => {
  res.render('auth/signup')
})

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

  try {
    if (!username || !password) {
      return res.render('auth/signup', { errorMessage : 'Something is missing!'} )
    }
    if (password.lenght < 8) {
      return res.render('auth/signup', { errorMessage : 'Oops... password should be at least 8 characters!'} )
    }

    const foundUser = await User.findOne({ username : username })
    if (foundUser) {
      return res.render('auth/signup', { errorMessage : 'Find yourself another name!'} )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const userToCreate = {
      username,
      password: hashedPassword
    }
    const userFromDb = User.create(userToCreate)
    res.redirect('/login')

  } catch (error) {
    next(error)
  }
})

router.get('/login', (req, res, next) => {
  res.render('auth/login')
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    if (!username || !password) {
      return res.render('auth/login', { errorMessage : 'Something is missing!'} )
    }
  
    const foundUser = await User.findOne(
      { username },
      { password : 1, username : 1 }
      )
    if (!foundUser) {
      return res.render('auth/login', { errorMessage : 'Not found, register yourself first!'} )
    }

    const matchingPass = await bcrypt.compare(password, foundUser.password)
    if (!matchingPass) {
      return res.render('auth/login', { errorMessage: 'Something is wrong with the password..'} )
    }

    req.session.currentUser = foundUser
    res.redirect('/profile')

  } catch (error) {
    next(error)
  }
})

router.get('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error)
    }
    res.redirect('/login')
  })
})

module.exports = router