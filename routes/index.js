const express = require('express'),
  passport = require('passport'),
  router = express.Router()

const authController = require('../controllers/auth.controller'),
  examsController = require('../controllers/exam.controller')

const authenticated = () => {
  return passport.authenticate('jwt', { session: false })
}

module.exports = router
  // Auth Routes
  .post('/register', authController.register)
  .post('/login', authController.login)
  .patch('/change-password', authenticated(), authController.changePassword)
  .delete('/logout', authenticated(), authController.logout)
  // Exam Routes
  .get('/exams/', authenticated(), examsController.index)
  .get('/exams/:id', authenticated(), examsController.show)
  .post('/exams/', authenticated(), examsController.create)
  .put('/exams/:id', authenticated(), examsController.update)
  .delete('/exams/:id', authenticated(), examsController.destroy)
