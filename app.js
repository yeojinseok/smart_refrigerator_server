const express = require('express')
const path = require('path')
const morgan = require('morgan')
const userPage = require('./routes/userPage.js')
const root = require('./routes/root.js')
require('dotenv').config()
const { sequelize } = require('./models')

const app = express()
const authRouter = require('./routes/auth.js')

// app.set('port', process.env.PORT || 9306)
app.set('port', process.env.PORT)
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공')
  })
  .catch(err => {
    console.error(err)
  }) // 시퀄라이즈 초기화.

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use('/auth', authRouter)
app.use('/userPage', userPage)
app.use('/root', root)

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
})
