const express = require('express');
const router = express.Router();
const Candidate = require('../model/Candidate');
const mongoose = require('mongoose'),
 checkAuth = require('../middleware/check-auth');

router.get('/',checkAuth,(req,res,next) =>{
  Candidate.find()
   .then(result=>{
        res.status(200).json({
            candidateData:result
        });
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       })
   })
})

router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Candidate.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            candidate:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.post('/',(req,res,next) =>{
   const candidate = new Candidate({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    gender:req.body.gender
   })

   candidate.save()
   .then(result =>{
       console.log(result);
       res.status(200).json({
           newCandidate:result
       })
   })

   .catch(err=> {
       console.log(err);
       res.status(500).json({
           error:err
       })
   })
})

router.delete('/:id',(req,res,next) =>{
    Candidate.remove({_id:req.params.id})
    .then(_result=>{
        res.status(200).json({
            message:'deleted successfully',           
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//put request
router.put('/:id',(req,res,next) =>{
    console.log(req.params.id);
   Candidate.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
            
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_candidate:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;