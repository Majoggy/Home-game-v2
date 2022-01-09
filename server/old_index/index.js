import express from 'express'
import { v4 as uuid } from 'uuid'

const app = express()
const port = 4000

// * Fake Database
const dogs = [
  { name: 'Pepper', age: '9 years old', species: 'Poog', id: uuid() },
  { name: 'Ginger', age: '5 months', species: 'Horse', id: uuid() } 
]

// * Logging Middleware
app.use('/', (req, _res, next) => {
  console.log(`Incoming ${req.method} to ${req.url}`)
  next()
})

// * Body Parsing Middleware
app.use(express.json())

// * Route handling Middleware

// Get all poogs
app.get('/dogs', (_req, res) => {
  res.json(dogs)
})

// Get single poog
app.get('/dogs/:id', (req, res) => {
  const { id } = req.params
  const dog = dogs.find(dog => dog.id === id)

  if (!dog) {
    return res.status(404).json({ message: 'There is no poog' })
  }
  return res.status(200).json(dog)
})

// Create new poog
app.post('/dogs/', (req, res) => {
  const dog = { ...req.body, id: uuid() }
  dogs.push(dog)

  return res.status(201).json(dog)
})

// Edit poog

app.put('/dogs/:id', (req, res) => {
  const { id } = req.params
  const dogIndex = dogs.findIndex(dog => dog.id === id)

  if (dogIndex < 0) {
    return res.status(404).json({ message: 'No poog by that id' })
  }
  dogs[dogIndex] = { ...dogs[dogIndex], ...req.body }
  return res.status(201).json(dogs[dogIndex])
})

// Delete poog

app.delete('/dogs/:id', (req, res) => {
  const { id } = req.params
  const dogIndex = dogs.findIndex(dog => dog.id === id)
  
  if (dogIndex < 0) {
    return res.status(404).json({ message: 'No poog by that id!' })
  }
  dogs.splice(dogIndex, 1)
  return res.status(200).json({ message: 'Poog has been deleted :(' })

})

// * Listener
app.listen(port, () => {
  console.log(`😎 Watching port ${port} like a hawk 🦅`)
})
