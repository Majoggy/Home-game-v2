import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
})

// Virtuals for populating profile view with added games and players

userSchema
  .virtual('addedPlayers', {
    ref: 'Players',
    localField: '_id',
    foreignField: 'userId',
  })
  .get(function (addedPlayers) {
    if (!addedPlayers) return

    return addedPlayers.map((player) => {
      return {
        _id: player._id,
        name: player.name,
      }
    })
  })

userSchema
  .virtual('addedGames', {
    ref: 'Games',
    localField: '_id',
    foreignField: 'userId',
  })
  .get(function (addedGames) {
    if (!addedGames) return

    return addedGames.map((game) => {
      return {
        _id: game._id,
        firstPlace: game.firstPlace,
        secondPlace: game.secondPlace,
        thirdPlace: game.thirdPlace,
        fourthPlace: game.fourthPlace,
        fifthPlace: game.fifthPlace,
        sixthPlace: game.sixthPlace,
        seventhPlace: game.seventhPlace,
        eigthPlace: game.eigthPlace,
        ninthPlace: game.ninthPlace,
        buyIn: game.buyIn,
        firstPrize: game.firstPrize,
        secondPrize: game.secondPrize,
        thirdPrize: game.thirdPrize,
      }
    })
  })

// Removes password field on conversion to JSON

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    return json
  },
})

userSchema.set('toObject', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    return json
  },
})

//  Create virtual field for password validation

userSchema.virtual('passwordConfirmation').set(function (passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation
})

// Pre-validation for validating password

userSchema.pre('validate', function (next) {
  if (
    this.isModified('password') &&
    this.password !== this._passwordConfirmation
  ) {
    this.invalidate('passwordConfirmation', 'does not match')
  }
  next()
})

// Pre-validation for encrypting password using bcrypt

userSchema.pre('validate', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

// Compares hashed password to input password and returns true or false

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

// Plugin that adds error handling for unique values

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('Users', userSchema)

export default User
