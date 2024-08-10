const asynHandler=require("express-async-handler")

const jwt=require("jsonwebtoken")

const validToken=asynHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error("user is not authorized")
            }
            req.loginUser=decoded.loginUser;
            next();
        })
        if(!token){
            res.status(401)
            throw new Error("user not authorized or token missing")
        }
    }
})

module.exports=validToken