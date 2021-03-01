const path = require('path');
const Sequelize = require('sequelize');
const { Transaction } = require('sequelize');
const transaction = require('./receipt');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User = require('./user')(sequelize, Sequelize);
db.Receipt = require('./receipt')(sequelize, Sequelize); 
//테이블 모델

db.User.hasOne(db.Receipt, { as: 'SendUser', foreignKey: 'sendId' });
db.User.hasOne(db.Receipt, { as: 'ReceiveUser', foreignKey: 'receiveId' });
//테이블 관계


module.exports = db;