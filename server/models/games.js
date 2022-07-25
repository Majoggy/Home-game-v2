import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const gameSchema = new mongoose.Schema({
  firstPlace: {
    type: mongoose.Schema.ObjectId,
    ref: 'Players',
    required: true,
  },
  secondPlace: {
    type: mongoose.Schema.ObjectId,
    ref: 'Players',
    required: true,
  },
  thirdPlace: {
    type: mongoose.Schema.ObjectId,
    ref: 'Players',
    required: true,
  },
  fourthPlace: { type: mongoose.Schema.ObjectId, ref: 'Players' },
  fifthPlace: { type: mongoose.Schema.ObjectId, ref: 'Players' },
  sixthPlace: { type: mongoose.Schema.ObjectId, ref: 'Players' },
  seventhPlace: { type: mongoose.Schema.ObjectId, ref: 'Players' },
  eighthPlace: { type: mongoose.Schema.ObjectId, ref: 'Players' },
  ninthPlace: { type: mongoose.Schema.ObjectId, ref: 'Players' },
  buyIn: { type: Number, required: true },
  firstPrize: { type: Number, required: true },
  secondPrize: { type: Number, required: true },
  thirdPrize: { type: Number, required: true },
  date: { type: String },
  notes: { type: String },
  userId: { type: mongoose.Schema.ObjectId, ref: 'Users', required: true },
})

// Plugin that adds error handling for unique values
gameSchema.plugin(mongooseUniqueValidator)

const Games = mongoose.model('Games', gameSchema)

export default Games
