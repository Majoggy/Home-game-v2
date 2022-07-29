import Games from '../models/games.js'
import { NotFound } from '../lib/errors.js'

// * Routing Middleware

// Get all Games
async function gameIndex(_req, res, next) {
  try {
    const games = await Games.find()
    return res.status(200).json(games)
  } catch (err) {
    next(err)
  }
}

// Get single Game
async function getSingleGame(req, res, next) {
  try {
    const { gameId } = req.params
    const foundGame = await Games.findById(gameId)
      .populate('userId')
      .populate('firstPlace')
      .populate('secondPlace')
      .populate('thirdPlace')
      .populate('fourthPlace')
      .populate('fifthPlace')
      .populate('sixthPlace')
      .populate('seventhPlace')
      .populate('eighthPlace')
      .populate('ninthPlace')
    if (!foundGame) throw new NotFound()
    return res.status(200).json(foundGame)
  } catch (err) {
    next(err)
  }
}

// Create new Game
async function createGame(req, res, next) {
  const { currentUser } = req
  try {
    const createdGame = await Games.create({ ...req.body, userId: currentUser })
    return res.status(201).json(createdGame)
  } catch (err) {
    next(err)
  }
}

// Edit single Game
async function editGame(req, res, next) {
  try {
    const { gameId } = req.params
    const gameToUpdate = await Games.findById(gameId)
    if (!gameToUpdate) throw new NotFound()
    Object.assign(gameToUpdate, req.body)
    await gameToUpdate.save()
    return res.status(202).json(gameToUpdate)
  } catch (err) {
    next(err)
  }
}

// Delete single game
async function deleteGame(req, res, next) {
  try {
    const { gameId } = req.params
    const gameToDelete = await Games.findByIdAndDelete(gameId)
    if (!gameToDelete) throw new NotFound()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// Get game index created by User
async function indexByUser(req, res, next) {
  try {
    const { userId } = req.params
    console.log(userId)
    const games = await Games.find({ userId })
    if (!games || games.length < 1) {
      throw new NotFound()
    }
    return res.status(200).json(games)
  } catch (err) {
    console.log('hi')
    next(err)
  }
}

export default {
  index: gameIndex,
  show: getSingleGame,
  create: createGame,
  update: editGame,
  delete: deleteGame,
  indexByUser: indexByUser,
}
