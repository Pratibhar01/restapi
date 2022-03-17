const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
                message:'mail exists'
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
                       message:'User created'
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

 router.post('/login',(req,res,next)=>{
     User.findOne({email:req.body.email})
     .exec()
     .then(user=>{
         console.log('result:', user);
         if(user.length < 1)
         {
             return res.status(200).json({
                 status:"10003",
                 msg:'email not exist'
             })
         }      
         bcrypt.compare(req.body.password,user.password,(err,result)=>{
             if(!result)
             {
                 return res.status(200).json({
                     status:"10004",
                     msg:'password matching fail'
                 })
             }
            if(result)
            {
                const token = jwt.sign({
                   email :user.email
                
                 },
                 'this is dummy text',
                
                  );
                res.status(200).json({
                    status:"10005",
                    email:user.email,
                    token :token

                })
            }
         })
     })
    
     .catch(err=>{
         console.log('error:',err);
         res.status(500).json({
             err:err
         })
     })
       
 })


    


module.exports = router;