const Exam = require('../models/exam.model')

exports.index = (req, res) => {
  Exam.getExams()
    .then(exams => res.json(exams))
    .catch(err => res.send(err))
}

exports.show = (req, res) => {
  Exam.getExam(req.params.id)
    .then(exam => {
      if (!exam) return res.sendStatus(401)
      return res.json(exam)
    })
    .catch(err => res.send(err))
}

exports.create = (req, res) => {
  //TODO validate req.body
  req.body._owner = req.user._id
  Exam.createExam(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => res.send(err))
}

exports.update = (req, res) => {
  //TODO validate req.body
  Exam.isOwner(req.params.id, req.user._id).then(owner => {
    if (!owner.length) return res.sendStatus(401)
    Exam.updateExam(req.params.id, req.body)
      .then(() => res.sendStatus(204))
      .catch(err => res.send(err))
  })
}

exports.destroy = (req, res) => {
  Exam.isOwner(req.params.id, req.user._id).then(owner => {
    if (!owner.length) return res.sendStatus(401)
    Exam.deleteExam(req.params.id)
      .then(() => res.sendStatus(204))
      .catch(err => res.send(err))
  })
}

exports.addQuestion = question => {
  Exam.pushQuestion(question.exam, question.id).catch(err => res.send(err))
}
