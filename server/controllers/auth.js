import User from '../models/user.js'
import { Unauthorized, NotFound } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'


// * Routing Middleware

async function registerUser(req, res, next) {
  try {
    const createdUser = await User.create(req.body)
    return res.status(201).json({
      message: `Welcome ${createdUser.name}`,
    })
  } catch (err) {
    next(err)
  }
}

async function loginUser(req, res, next) {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Unauthorized()
    }

    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7 days' })

    return res.status(202).json({
      message: `Welcome back ${userToLogin.name}`,
      token,
    })
  } catch (err) {
    next(err)
  }
}

async function userIndex (_req, res, next) {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

async function profile (req, res, next) {
  try {
    const { currentUserId } = req
    const user = await User.findById(currentUserId)
      .populate('addedGames')
      .populate('addedPlayers')

    if (!user) throw new NotFound()
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export default {
  register: registerUser,
  login: loginUser,
  index: userIndex,
  profile: profile,
}