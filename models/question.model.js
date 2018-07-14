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
        default: false
      }
    }
  ]
})

const Question = (module.exports = mongoose.model('Question', QuestionSchema))

module.exports.getQuestions = callback => {
  Question.find(callback)
}

// For getting the full question
module.exports.getQuestion = (id, callback) => {
  Question.findById(id, callback)
}

module.exports.createQuestion = (body, callback) => {
  const newQuestion = new Question(body)
  newQuestion.save(callback)
}

module.exports.updateQuestion = (id, question, callback) => {
  const updatedQuestion = {
    ...question,
    updatedAt: new Date()
  }
  Question.findByIdAndUpdate(id, updatedQuestion, callback)
}

module.exports.deleteQuestion = (id, callback) => {
  Question.findByIdAndRemove(id, callback)
}
