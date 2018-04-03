const asyncMiddleware = require('./utils/asyncMiddleware')
const router = require('express').Router()
const exercise = require('./controllers/exercise')

router.get('/exercise/new', asyncMiddleware(exercise.new))
router.get('/exercise/status', asyncMiddleware(exercise.status))

module.exports = router
