import Players from '../models/player.js'
import { NotFound } from '../lib/errors.js'

// * Routing middleware

// Get all Players
async function playerIndex (_req, res, next) {
  try {
    const players = await Players.find()
    return res.status(200).json(players)
  } catch (err) {
    next(err)
  }
}

// Get single Player
async function getSinglePlayer (req, res, next) {
  try {
    const { playerId } = req.params
    const foundPlayer = await Players.findById(playerId)
    if (!foundPlayer) throw new NotFound()
    return res.status(200).json(foundPlayer)
  } catch (err) {
    next(err)
  }
}

// Create new player
async function createPlayer (req, res, next) {
  try {
    const createdPlayer = await Players.create(req.body)
    return res.status(201).json(createdPlayer)
  } catch (err) {
    next(err)
  }
}

// Edit single player
async function editPlayer (req, res, next) {
  try {
    const { playerId } = req.params
    const playerToUpdate = await Players.findById(playerId)
    if (!playerToUpdate) throw new NotFound()
    Object.assign(playerToUpdate, req.body)
    await playerToUpdate.save()
    return res.status(202).json(playerToUpdate)
  } catch (err) {
    next(err)
  }
}

// Delete single player
async function deletePlayer (req, res, next) {
  try {
    const { playerId } = req.params
    const playerToDelete = await Players.findByIdAndDelete(playerId)
    if (!playerToDelete) throw new NotFound()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export default {
  index: playerIndex,
  show: getSinglePlayer,
  create: createPlayer,
  update: editPlayer,
  delete: deletePlayer,
}