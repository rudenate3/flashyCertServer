// Defines a Schema for an Exam

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const ExamSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String, // Title of the Exam
    required: true
  },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  passing: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  }
})

const Exam = (module.exports = mongoose.model('Exam', ExamSchema))

module.exports.getExams = callback => {
  Exam.find({}, ['_owner', 'title'], callback)
}

// For getting the full exam
module.exports.getExam = (id, callback) => {
  Exam.findById(id, callback)
}

module.exports.createExam = (body, callback) => {
  const newExam = new Exam(body)
  newExam.save(callback)
}

module.exports.updateExam = (id, exam, callback) => {
  const updatedExam = {
    ...exam,
    updatedAt: new Date()
  }
  Exam.findByIdAndUpdate(id, updatedExam, callback)
}

module.exports.deleteExam = (id, callback) => {
  Exam.findByIdAndRemove(id, callback)
}

module.exports.pushQuestion = (id, question, callback) => {
  Exam.findByIdAndUpdate(
    { _id: id },
    { $push: { questions: question } },
    callback
  )
}
