const express = require('express');
const path = require('path');
const morgan = require('morgan');
const userPage = require('./routes/userPage.js')
const root = require('./routes/root.js')
require('dotenv').config();
const { sequelize } = require('./models');

const app = express();
const authRouter = require('./routes/auth.js');
app.set('port', process.env.PORT || 3000);

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  }); // 시퀄라이즈 초기화. 
/* 
var sequelize = require('./models').sequelize;a
sequelize.sync(); 
*/
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use('/userPage', userPage);
app.use('/root',root);


app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});