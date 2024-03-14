const prisma = require('../db')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
  const body = req.body

  if (!body.password) {
    return res.status(400).json({
      error: 'Password is missing'
    })
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = await prisma.user.create({
    data: {
      full_name: body.full_name,
      username: body.username,
      password_hash: passwordHash
    }
  })

  const userWithoutPassword = req.exclude(user, ['password_hash'])

  res.status(201).json(userWithoutPassword)
}

const getUser = async (req, res) => {
  const id = req.params.id
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      project: {
        include: {
          tasks: true
        }
      }
    }
  })

  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    })
  }

  res.json(user)
}

module.exports = { createUser, getUser }
