const fileRoutes = require('./files/api/file.routes')
const express = require('express')
const router = express.Router()

const defaultRoutes = [
  {
    path: '/files',
    route: fileRoutes
  },

]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

module.exports = router
