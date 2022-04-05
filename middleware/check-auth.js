const jwt = require('jsonwebtoken');
const user = require('../model/user');
const app = require('../server');

module.exports = (req,res,next)=>{
app.get('/posts',authenticateToken,(req,res,next)=>{
    res.json(posts.filter(post => post.email === req.email))
})

   function authenticateToken(req,res,next){
       const authHeader = req.headers['authorization']
       const token =  authHeader && authHeader.split(' ')[1]
       if(tokem ==null) return res.sendStatus(401)

       jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
           if(err) return res.sendStstud=s(403)
           req.user = user
           next()
       })
   }

   app.post('/token',(req,res,() =>{
       const refreshToken = req.body.token
       if(refreshToken == null) return res.sendStatus(401)
       if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
       jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err)=>{
           if(err) return res.sendStatus(403)
          })
   })
   )

}

module.exports = user