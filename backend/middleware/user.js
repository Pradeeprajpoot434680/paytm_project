const { JWT_SECRET} = require('../config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader)
    {
        return res.status(404).json({
            msg:"token not found"
        })
    }

    const token =   authHeader.split(' ')[1];
    
    
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        
        if(decoded.userId){

            req.userId = decoded.userId;
            next();
        }
        else{
            return res.status(404).json({
                msg:"userId not found"
            })
        }
    }
    catch(err)
    {
        return res.status(404).json({
            msg:"error"
        })
    }
}
        
        
 
        
module.exports=authMiddleware;