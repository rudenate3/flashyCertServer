const ExamModel = require('../../models/exam.model')

describe('Exam Model', () => {
  describe('Get Exam', () => {
    test('Should fail with invalid input - number', async () => {
      await expect(ExamModel.getExam(2)).resolves.toBe(null)
    })
    test('Should fail with invalid input - invalid ObjectId', async () => {
      await expect(ExamModel.getExam('2')).resolves.toBe(null)
    })
    test('Should fail with invalid input - empty', async () => {
      await expect(ExamModel.getExam()).resolves.toBe(null)
    })
  })
})
