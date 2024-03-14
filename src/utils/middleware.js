const excludePassword = (user, keys) => {
  return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)))
}

const exclude = (req, res, next) => {
  req.exclude = excludePassword
  next()
}

module.exports = { exclude }
