import express from 'express'
import players from '../controllers/players.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'
import games from '../controllers/games.js'

const router = express.Router()

router.route('/games')
  .get(games.index)
  .post(secureRoute, games.create)

router.route('/games/:gameId')
  .get(games.show)
  .put(secureRoute, games.update)

router.get('/games/user/:userId', games.indexByUser)

router.route('/players')
  .get(players.index)
  .post(secureRoute, players.create)

router.route('/players/:playerId')
  .get(players.show)
  .put(secureRoute, players.update)
  .delete(players.delete)

router.get('/players/user/:userId', players.indexByUser)
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/users', auth.index)
router.get('/users/:userId', secureRoute, auth.profile)

// Add secureRoute to all routes bar login & register
// Like below - 
// .get(secureRoute, players.show)
// .put(secureRoute, players.update)

export default router