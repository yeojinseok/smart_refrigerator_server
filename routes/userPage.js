const express = require('express'); // express
const jwt = require('jsonwebtoken'); // jwttoken
const { User, Sequelize } = require('../models'); // UserTable
const { Receipt } = require('../models'); // ReceiptTable
const router = express.Router(); 
const { verifyToken } = require('./middlewares'); //jwt token 검증

router.post('/sendMoney', verifyToken, async (req, res, next) => { // 특정 유저에게 돈을 전송하는 라우터
   const { id } = req.decoded;
   const { receiveid, money } = req.body;
   const sendUser = await User.findOne({where:{id:id}})
   const receiveUser = await User.findOne({where:{id:receiveid}})
   if(!receiveUser){
      return res.status(404).json({ emailnotfound: 'id not found' }); // 받는 유저의 아이디가 존재하지 않을 경우 오류출력.
   }
   if(+sendUser.credit < +money){
      return res.status(404).json({ emailnotfound: 'no money' });
   }
      const receiveUserCredit = +receiveUser.credit + +money; // 받는 유저 계좌
      const sendUserCredit = +sendUser.credit - + money; // 보내는 유저 계좌
      User.update({ credit: sendUserCredit }, 
         { where: { id:id } });

      User.update({ credit: receiveUserCredit },
         { where: { id: receiveid } });
      
      Receipt.create({ //거내 내역 테이블 create
         receiveId: receiveUser.id,
         sendId: sendUser.id,
         money,
         sendUserCredit,
         receiveUserCredit,
         
      })
      return res.json({
         receiveUser: receiveid,
         sendMoney: money,
         credit: sendUserCredit
      })

   });
   router.get('/checkMoney/:page',verifyToken, async(req,res,next)=>{ //거래내역 확인하는 라우터.
      const page = req.params.page;
      const {id} = req.decoded;
      const Op = Sequelize.Op;
      let offset = 0; // sql문 출력 시작할 문서의 번호
      console.log(page);
      if(page>1){
         offset = 10*(page-1);
         console.log(offset);
      }
      
      // union 으로 병합하여 보낸 계좌들을 설정하고 싶었으나, union은 구현이 안되어있다.
      Receipt.findAll({
         attributes :[['id','거래번호'],['sendId','보낸사람'],['receiveId','받는사람'],['money','MONEY'],['createdAt','TIME']],
         where: {
             [Op.or]:[{sendId:id},{receiveId:id}]
         },
         offset: offset,
         limit: 10
      }).then((receipt)=>{
         res.status(200).json({status: true,
                               result: receipt});
      })
   })

module.exports = router;