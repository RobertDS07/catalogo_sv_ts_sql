import { Sequelize } from 'sequelize'

const dbConfig = require('../config/database')

const sequelize = new Sequelize(dbConfig)

sequelize.sync()

export default sequelize
