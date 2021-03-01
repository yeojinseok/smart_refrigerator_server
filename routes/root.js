const express = require('express'); // express
const { User, Sequelize } = require('../models'); // UserTable
const { Receipt } = require('../models'); // ReceiptTable
const router = express.Router(); 

router.post('/sendMoney', async (req, res, next) => { // 특정 유저에게 돈을 전송하는 라우터
   const { receiveid, money } = req.body;
   const receiveUser = await User.findOne({where:{id:receiveid}})
   if(!receiveUser){
      return res.status(404).json({ emailnotfound: 'id not found' }); // 받는 유저의 아이디가 존재하지 않을 경우 오류출력.
   }
      const receiveUserCredit = +receiveUser.credit + +money; // 받는 유저 계좌

      User.update({ credit: receiveUserCredit },
         { where: { id: receiveid } });
      
      Receipt.create({ //거내 내역 테이블 create
         receiveId: receiveUser.id,
         sendId: 'root',
         money,
         sendUserCredit : 9999999,
         receiveUserCredit,
         
      })
      return res.json({
         receiveUser: receiveid,
         sendMoney: money,
         receiveUsercredit: receiveUserCredit
      })

   });

module.exports = router;