// Defines a Schema for an Question

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const QuestionSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Possible Questions for this question
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
        required: true,
        default: false
      }
    }
  ]
})

const Question = (module.exports = mongoose.model('Question', QuestionSchema))

// For getting the full question
module.exports.getQuestion = id => {
  if (!isObjectId(id)) return Promise.resolve(null)
  return Question.findById(id)
}

module.exports.createQuestion = body => {
  return new Question(body).save()
}

module.exports.updateQuestion = (id, question) => {
  if (!isObjectId(id)) return Promise.resolve(null)
  const updatedQuestion = {
    ...question,
    updatedAt: new Date()
  }
  return Question.findByIdAndUpdate(id, updatedQuestion)
}

module.exports.deleteQuestion = id => {
  if (!isObjectId(id)) return Promise.resolve(null)
  return Question.findByIdAndRemove(id)
}

module.exports.isOwner = (examId, userId) => {
  return Exam.find({ _id: examId, _owner: userId })
}

const isObjectId = id => mongoose.Types.ObjectId.isValid(id)
