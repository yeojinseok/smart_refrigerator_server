const express = require('express')
const bcrypt = require('bcrypt') // 암호화
const jwt = require('jsonwebtoken') // 토큰
const { User } = require('../models') // User 테이블
const router = express.Router()
const { verifyToken } = require('./middlewares')

router.post('/signup', async (req, res, next) => {
  //회원가입 라우터.
  const { id, name, password } = req.body
  console.log(req.body.json)

  try {
    // 중복 id 검사
    const exUser = await User.findOne({ where: { id } })
    if (exUser) {
      res.status(500).json({ error: '중복되는 아이디.' })
    }
    // bcrypt로 password를 암호화
    const hash = await bcrypt.hash(password, 12)
    await User.create({
      id,
      name,
      password: hash,
      credit: 500,
    })
    return res.status(200).json({ success: 'true' })
  } catch (error) {
    console.error(error)
    return next(error)
  }
})

router.post('/signin', async (req, res, next) => {
  // 로그인 라우터.
  const {
    body: { id, password },
  } = req

  User.findOne({
    where: {
      id,
    },
  }).then(user => {
    // 아이디가 없을 경우.
    if (!user) {
      return res.status(404).json({ emailnotfound: 'id not found' })
    }
    // password 비교
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          credit: user.credit,
        }

        jwt.sign(
          //토큰생성
          payload, // 정보
          process.env.JWT_SECRET, // key
          {
            // token의 지속시간
            expiresIn: '24h',
          }, // 옵션
          (err, token) => {
            res.json({
              name: user.name,
              id: user.id,
              credit: user.credit,
              token: token,
            })
          }
        )
      } else {
        return res.status(400).json({ passwordincorrect: 'Password incorrect' })
      }
    })
  })
})

module.exports = router
