const express = require('express'),
  passport = require('passport'),
  router = express.Router()

const authController = require('../controllers/auth.controller'),
  examsController = require('../controllers/exam.controller'),
  questionsController = require('../controllers/question.controller')

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
  .patch('/exams/:id', authenticated(), examsController.update)
  .delete('/exams/:id', authenticated(), examsController.destroy)
  // Question Routes
  .get('/questions/:id', authenticated(), questionsController.show)
  .post('/questions/', authenticated(), questionsController.create)
  .patch('/questions/:id', authenticated(), questionsController.update)
  .delete('/questions/:id', authenticated(), questionsController.destroy)
