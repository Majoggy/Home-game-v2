import User from '../models/user.js'
import { Unauthorized, NotFound } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import statify from '../config/helpers.js'

// * Routing Middleware

async function registerUser(req, res, next) {
  try {
    const createdUser = await User.create(req.body)
    return res.status(201).json({
      message: `Welcome ${createdUser.firstName} ${createdUser.lastName}!`,
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

    const token = jwt.sign({ sub: userToLogin._id }, secret, {
      expiresIn: '7 days',
    })

    return res.status(202).json({
      message: `Welcome back ${userToLogin.firstName} ${userToLogin.lastName}!`,
      token,
    })
  } catch (err) {
    next(err)
  }
}

async function userIndex(_req, res, next) {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

async function profile(req, res, next) {
  try {
    let statistics = []
    const { currentUserId } = req

    let user = await User.findById(currentUserId)
      .populate('addedPlayers')
      .populate([
        {
          path: 'addedGames',
          populate: {
            path: 'firstPlace secondPlace thirdPlace fourthPlace fifthPlace sixthPlace seventhPlace eighthPlace',
          },
        },
      ])

    if (!user) throw new NotFound()

    // Generate statistics if possible
    if (user.addedGames.length > 0 && user.addedPlayers.length > 0) {
      statistics = statify(user)
    }

    // Convert to object to merge with stats
    user = user.toObject()

    return res.status(200).json({ ...user, statistics })
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
