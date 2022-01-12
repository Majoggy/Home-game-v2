export default function errorHandler(err, req, res, next) {
  console.log(`Something went wrong!
  Error ${err.name}`)
  console.log(err.stack)

  if (err.name === 'NotFound' || err.name === 'CastError') {
    return res.status(404).json({ message: 'Not Found' })
  }

  if (err.name === 'ValidationError') {
    const customErrors = {}
    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }
    return res.status(422).json(customErrors)
  }

  if (err.name === 'JsonWebTokenError' ||
    err.name === 'TokenExpiredError' ||
    err.name === 'Unauthorized') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // Something has gone wrong
  res.sendStatus(500)

  // Send error to generic express error handling
  next(err)
}