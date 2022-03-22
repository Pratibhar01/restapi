const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('../server');



require('dotenv').config()

// const services = require('../services/render')

// router.get('/',services.homeRoute);


// router.get('/add-user',services.add_user);

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length >=1){
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
                if (result) {
                   const email = req.body.email
                   const user ={email}
                   
                    const accessToken = generateAccessToken(user)
                    const refreshToken = generateRefreshToken(user)
                    
                   'this is dummy text',

                    res.status(200).json({
                        status:"10005",
                        msg:"login successful",
                     data:{
                        _id: new mongoose.Types.ObjectId,
                        username:user.username,
                        email: user.email,
                        accessToken:accessToken,
                        refreshToken:refreshToken,
                        profilePicUrl:"https://picsum.photos/id/104/367/267"
                        }
                    })
                    function generateAccessToken(user){
                        return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
                    }
                    function generateRefreshToken(user){
                        return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
                    }
                }
            })
        }).catch(err => {
                res.status(500).json({
                    err: err
                })
            })
})

module.exports = router;