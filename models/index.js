const path = require('path')
const Sequelize = require('sequelize')
// const { Transaction } = require('sequelize');
// const transaction = require('./RefLog');

const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env]
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password
)

db.sequelize = sequelize
// db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize)
db.Food = require('./Food')(sequelize, Sequelize)
db.RefrigeratorLog = require('./RefrigeratorLog')(sequelize, Sequelize)
//테이블 모델

db.User.hasOne(db.RefrigeratorLog, { as: 'userid', foreignKey: 'userid' })
// db.Food.hasOne(db.RefrigeratorLog, { as: 'food', foreignKey: 'food' })
//테이블 관계

module.exports = db
