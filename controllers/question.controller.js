const Question = require('../models/question.model')
const ExamController = require('./exam.controller')

exports.index = (req, res, next) => {
  Question.getQuestions((err, questions) => {
    if (err) return next(err)
    res.json(questions)
  })
}

exports.show = function(req, res, next) {
  Question.getQuestion(req.params.id, (err, question) => {
    if (err) return next(err)
    if (!question) return res.sendStatus(404)
    res.json(question)
  })
}

exports.create = function(req, res, next) {
  //TODO validate req.body
  req.body._owner = req.user._id
  exam = req.body.exam
  Question.createQuestion(req.body, (err, question) => {
    if (err) {
      res.send(err)
    } else {
      ExamController.addQuestion({ exam: exam, id: question._id })
      res.json({
        success: true,
        message: 'Question Created'
      })
    }
  })
}

exports.update = function(req, res, next) {
  Question.getQuestion(req.params.id, (err, question) => {
    if (err) return next(err)
    if (!question) return res.sendStatus(404)
    if (!question._owner !== req.user._id) return res.sendStatus(401)
    Question.updateQuestion(req.params.id, req.body, err => {
      //TODO validate req.body
      if (err) res.send(err)
      res.json({
        success: true,
        message: 'Question Updated'
      })
    })
  })
}

exports.destroy = function(req, res, next) {
  Question.getQuestion(req.params.id, (err, question) => {
    if (err) return next(err)
    if (!question) return res.sendStatus(404)
    if (question._owner !== req.user._id) return res.sendStatus(401)
    Question.deleteQuestion(req.params.id, err => {
      if (err) return res.send(500, err)
      return res.sendStatus(204)
    })
  })
}
