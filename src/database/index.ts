import { Sequelize } from 'sequelize'

const dbConfig = require('../config/database')

const sequelize = new Sequelize(dbConfig)

const syncModels = (async () => await sequelize.sync())()

export default sequelize