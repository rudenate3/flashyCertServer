// Express config
const config = {
  port: 3000
}

// Vendor imports
const chalk = require('chalk'),
  express = require('express'),
  mongoose = require('mongoose'),
  app = express()

// Import Routes
const routes = require('./routes')

// Mongoose Setup
mongoose.connect('mongodb://localhost:27017/flashyCerts')
mongoose.connection.on('error', () => {
  throw new Error('Unable to connect to Mongo')
})

// app Setup
app.use(express.json())
app.use('/', routes)

// Start server
app.listen(config.port, () => {
  let dateTime = new Date()
  dateTime = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
  console.log(
    chalk.blue(`Server started @ ${dateTime} on port: ${config.port}`)
  )
})
