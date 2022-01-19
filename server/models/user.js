import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
})

// Removes password field on conversion to JSON

userSchema.set('toJSON', {
  transform(_doc, json) {
    delete json.password
    return json
  },
})

//  Create virtual field for password validation

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// Pre-validation for validating password 

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

// Pre-validation for encrypting password using bcrypt

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

// Compares hashed password to input password and returns true or false

userSchema
  .methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

// Plugin that adds error handling for unique values

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('Users', userSchema)

export default User