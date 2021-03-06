// Load Environment Variables
let dev = process.env.NODE_ENV !== 'production'

if (dev) {
  require('dotenv').load()

}

// Vendor imports
const chalk = require('chalk'),
  cors = require('cors'),
  express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  app = express()

// Import Routes
const routes = require('./routes')

// Mongoose Setup
mongoose.connect(process.env.mongoUri)
mongoose.connection.on('error', () => {
  throw new Error('Unable to connect to Mongo')
})
if (dev) mongoose.set('debug', (collection, method) => {
  console.debug(`${collection}.${method}`)
})

if(dev) {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

// app Setup
app.use(cors({ origin: process.env.cors }))
app.use(express.json())
require('./config/passport')(passport)
app.use('/', routes)

// Start server
app.listen(process.env.port, () => {
  let dateTime = new Date()
  dateTime = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
  console.log(
    chalk.blue(`Server started @ ${dateTime} on port: ${process.env.port}`)
  )
})
