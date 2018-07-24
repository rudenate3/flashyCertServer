const Question = require('../models/question.model')
const ExamController = require('./exam.controller')

exports.show = (req, res) => {
  Question.getQuestion(req.params.id)
    .then(question => {
      if (!question) return res.sendStatus(401)
      return res.json(question)
    })
    .catch(err => res.send(err))
}

exports.create = (req, res) => {
  //TODO validate req.body
  req.body._owner = req.user._id
  const exam = req.body.exam
  Question.createQuestion(req.body)
    .then(() => {
      ExamController.addQuestion({ exam: exam, id: question._id })
      res.sendStatus(201)
    })
    .catch(err => res.send(err))
}

exports.update = (req, res) => {
  Question.isOwner(req.params.id, req.user._id).then(owner => {
    if (!owner.length) return res.sendStatus(401)
    Question.updateQuestion(req.params.id, req.body)
      .then(() => res.sendStatus(204))
      .catch(err => res.send(err))
  })
}

exports.destroy = (req, res) => {
  Question.isOwner(req.params.id, req.user._id).then(owner => {
    if (!owner.length) return res.sendStatus(401)
    Question.deleteQuestion(req.params.id)
      .then(() => res.sendStatus(204))
      .catch(err => res.send(err))
  })
}
