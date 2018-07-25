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

module.exports.getExams = () => {
  return Exam.find({}, ['_owner', 'title'])
}

// For getting the full exam
module.exports.getExam = id => {
  if (!isObjectId(id)) {
    return Promise.resolve(null)
  }
  return Exam.find({ _id: id }).populate('questions')
}

module.exports.createExam = body => {
  return new Exam(body).save()
}

module.exports.updateExam = (id, exam) => {
  if (!isObjectId(id)) return Promise.resolve(null)
  const updatedExam = {
    ...exam,
    updatedAt: new Date()
  }
  return Exam.findByIdAndUpdate(id, updatedExam)
}

module.exports.deleteExam = id => {
  if (!isObjectId(id)) return Promise.resolve(null)
  return Exam.findByIdAndRemove(id)
}

module.exports.pushQuestion = (id, question) => {
  return Exam.findByIdAndUpdate({ _id: id }, { $push: { questions: question } })
}

module.exports.isOwner = (examId, userId) => {
  return Exam.find({ _id: examId, _owner: userId })
}

const isObjectId = id =>
  typeof id === String && mongoose.Types.ObjectId.isValid(id)
