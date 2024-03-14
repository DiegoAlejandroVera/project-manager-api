const router = require('express').Router()
const { createUser, getUser } = require('../controller/user')

router.get('/', (req, res) => {
  res.send('hello world')
})

router.get('/:id', getUser)

router.post('/', createUser)

module.exports = router
