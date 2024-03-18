const knex = require('knex')

const configs = require('../knexfile')

const {NODE_ENV} = require('../config')

module.exports = knex(configs[NODE_ENV])

