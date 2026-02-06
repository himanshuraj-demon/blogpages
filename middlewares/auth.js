const { validateToken } = require("../service/auth");

function checkForAuthontication(cookiesName){
    return (req,res,next)=>{
            const tokenValue=req.cookies[cookiesName];
            if(!tokenValue){
                return next();
            }
            try {
                 const payloadCome=validateToken(tokenValue);
                 req.user=payloadCome;
                 
            } catch (error) {
                        }
           return next();
    }

}
function requireAuth(req,res,next){
   if(!req.user){
      return res.redirect("/user/login");
   }
   next();
}


module.exports={
    checkForAuthontication,
    requireAuth,
}