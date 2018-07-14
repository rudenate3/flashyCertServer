// Load Environment Variables
let dev = process.env.NODE_ENV !== 'production'

if (dev) {
  require('dotenv').load()
}

// Vendor imports
const chalk = require('chalk'),
  express = require('express'),
  mongoose = require('mongoose'),
  app = express()

// Import Routes
const routes = require('./routes')

// Mongoose Setup
mongoose.connect(process.env.mongoUri)
mongoose.connection.on('error', () => {
  throw new Error('Unable to connect to Mongo')
})

// app Setup
app.use(express.json())
app.use('/', routes)

// Start server
app.listen(process.env.port, () => {
  let dateTime = new Date()
  dateTime = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
  console.log(
    chalk.blue(`Server started @ ${dateTime} on port: ${process.env.port}`)
  )
})
