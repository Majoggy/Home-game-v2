import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: false, unique: false },
})

// Plugin that adds error handling for unique values
playerSchema.plugin(mongooseUniqueValidator)

const Players = mongoose.model('Players', playerSchema)

export default Players