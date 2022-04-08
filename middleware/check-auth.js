const jwt = require('jsonwebtoken');
const user = require('../model/user');
const app = require('../server');
const mongoose=require('mongoose')
function isAuthenticated (req, res, next) {

    if (typeof req.headers.authorization !== "undefined") {
        
        let token = req.headers.authorization.split(" ")[1];
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256" }, async(err, decodedToken) => {

            
            if (err) {  
 
                res.status(401).json({ 
                    status:"10006",
                    msg: "Not Authorized" });

            }else{
        
                const { user_id,type } = decodedToken;
                
                const users= await user.findOne({
                    _id:mongoose.Types.ObjectId(user_id)
                })
                if (users && type==="access"){
                    req.user=users
                
                    return next();
                }else{
                    res.status(401).json({ msg: "Not Authorized" });
                }
                
            }

            
        });
    } else {
        
        res.status(401).json({ msg: "Not Authorized" });

    }
}

module.exports = isAuthenticated;
