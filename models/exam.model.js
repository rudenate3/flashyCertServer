// Defines a Schema for an Exam

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const ExamSchema = new Schema({
  title: {
    type: String, // Title of the Exam
    required: true
  },
  questions: [
    {
      // Possible Questions for this exam
      question: {
        // Question being asked
        type: String,
        required: true
      },
      answers: [
        {
          // Possible Answers
          answer: {
            // Answer text
            type: String,
            required: true
          },
          correct: {
            // Whether this is a correct answer - allows for t/f, single/multi-choice answers
            type: Boolean,
            default: false
          }
        }
      ]
    }
  ],
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
  Exam.find({}, 'title', callback) // TODO verify this
}

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
