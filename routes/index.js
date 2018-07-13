const express = require('express'),
  router = express.Router()

const authController = require('../controllers/auth.controller'),
  examsController = require('../controllers/exam.controller')

module.exports = router
  // Auth Routes
  .post('/register', authController.register)
  .post('/login', authController.login)
  .patch('/change-password', authController.changePassword)
  .delete('/logout', authController.logout)
  // Exam Routes
  .get('/exams/', examsController.index)
  .get('/exams/:id', examsController.show)
  .post('/exams/', examsController.create)
  .put('/exams/:id', examsController.update)
  .delete('/exams/:id', examsController.destroy)
