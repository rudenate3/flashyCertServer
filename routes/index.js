const express = require('express'),
  router = express.Router()

const examsController = require('../controllers/exam.controller')

module.exports = router
  .get('/', examsController.index)
  .get('/:id', examsController.show)
  .post('/', examsController.create)
  .put('/:id', examsController.update)
  .delete('/:id', examsController.destroy)
