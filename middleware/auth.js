const jwt = require('jsonwebtoken');
const app = require('../server');

module.exports = (req,res,next)=>{
   try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log(verify);
        next();
   }
   catch(error)
   {
       return res.status(401).json({
           msg:'invalid token'
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