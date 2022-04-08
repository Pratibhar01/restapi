const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const checkAuth = require('../middleware/check-auth')

//const passport = require('passport')
//const initializePassport = require('../passport-config');
//initializePassport(
//    passport,
//    email =>User.find(user => user.email === email)
//)

require('dotenv').config()




router.get('/checkAuths',checkAuth,(req,res)=>{
    console.log(req.user._id,"asdadadsd")
    
    User.findOne({ _id:mongoose.Types.ObjectId(req.user._id)})
    .exec()
    .then(Users=>{
        console.log(Users,"Sdfsfdsfds")
        return res.status(200).json({
            "User":Users
        })
    })
})

router.post('/signup',(req,res,next)=>{
    User.findOne({email:req.body.email})
    .exec()
    .then(user =>{
        if(user){
            return res.status(200).json({
                status:"10001",
                msg:'mail exists'
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err)
                  {
                      return res.status(500).json({
                          error:err
                      })
                  }
                  else
                  {
                       const user = new User({
                   _id: new mongoose.Types.ObjectId,
                      username:req.body.username,
                      password:hash,
                      email:req.body.email
                   
               })
           
              user.save()
               .then(result=>{
                   console.log(result);
                   res.status(200).json({
                       status:"10002",
                       msg:'User created'
                   });
               })
               .catch(err=>{
                   console.log(err);
                   res.status(500).json({
                       error:err
                   })
               })
           }
           })
        }
    })
   
})


router.post('/login' ,(req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if(!user) {
                return res.status(200).json({
                    status:"10003",
                    msg: 'email not exist'
                })
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (!result) {
                    return res.status(200).json({
                        status:"10004",
                        msg: 'password matching fail'
                    })
                }

                if(result){
                    
                    let accessToken = jwt.sign({"user_id":user._id,"type":"access"}, process.env.ACCESS_TOKEN_SECRET, {'algorithm': 'HS256'},{
		        		expiresIn: "1d"
		        	})
			        let refreshToken = jwt.sign({"user_id":user._id,"type":"refresh"}, process.env.REFRESH_TOKEN_SECRET, {'algorithm': 'HS256'},{
				        expiresIn: "1d"
			        })
                
                    res.status(200).json({
                        status:"10005",
                        msg:"login successful",
                     data:{
                        username:user.username,
                        email: user.email,
                        accessToken:accessToken,
                        refreshToken:refreshToken,
                        profilePicUrl:"https://picsum.photos/id/104/367/267"
                        }
                    })
                }
            })
        }).catch(err => {
                res.status(500).json({
                    err: err
                })
            })
          
})
    


  

module.exports = router;