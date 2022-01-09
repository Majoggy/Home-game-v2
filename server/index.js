
import express from 'express'

import { connectToDb } from './db/helpers.js'
import logger from './lib/logger.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandler.js'
import { port } from './config/environment.js'

const app = express()

// * Body parsing middleware
app.use(express.json())

// * Logging Middleware (exported from lib)
app.use('/', logger)

// * Routing Middleware (exported from config/router and controllers)
app.use(router)

// * Error handling Middleware (exported from lib)
app.use(errorHandler)

async function startServer() {
  try {
    await connectToDb()
    console.log('Mongoose is connected')
    app.listen(port, () => console.log(`Listening on port ${port}`))
  } catch (err) {
    console.log('Problem connecting to mongoose')
    console.log(err)
  }
}

startServer()