const Exam = require('../models/exam.model')

exports.index = (req, res, next) => {
  Exam.getExams((err, exams) => {
    if (err) return next(err)
    res.json(exams)
  })
}

exports.show = function(req, res, next) {
  Exam.getExam(req.params.id, (err, exam) => {
    if (err) return next(err)
    if (!exam) return res.send(401)
    res.json(exam)
  })
}

exports.create = function(req, res, next) {
  //TODO validate req.body
  Exam.createExam(req.body, err => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        success: true,
        message: 'Exam Created'
      })
    }
  })
}

exports.update = function(req, res, next) {
  Exam.updateExam(req.params.id, req.body, err => {
    //TODO validate req.body
    if (err) res.send(err)
    res.json({
      success: true,
      message: 'Exam Updated'
    })
  })
}

exports.destroy = function(req, res, next) {
  Exam.deleteExam(req.params.id, err => {
    if (err) return res.send(500, err)
    return res.send(204)
  })
}
