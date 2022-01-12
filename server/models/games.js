import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const gameSchema = new mongoose.Schema({
  firstPlace: { type: String, required: true },
  secondPlace: { type: String, required: true },
  thirdPlace: { type: String, required: true },
  fourthPlace: { type: String },
  fifthPlace: { type: String },
  sixthPlace: { type: String },
  seventhPlace: { type: String },
  eighthPlace: { type: String },
  ninthPlace: { type: String },
  buyIn: { type: Number, required: true },
  firstPrize: { type: Number, required: true },
  secondPrize: { type: Number, required: true },
  thirdPrize: { type: Number, required: true },
  date: { type: String },
  notes: { type: String },
  userId: { type: String, required: true, unique: false },
})

// Plugin that adds error handling for unique values
gameSchema.plugin(mongooseUniqueValidator)

const Games = mongoose.model('Games', gameSchema)

export default Games