const JWT=require("jsonwebtoken");
const key="$$My#Page#Blog%987";
require('dotenv').config();
function createToken(user){
    const payload={
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        userImg:user.profileImageUrl,
    };
    const TOKEN=JWT.sign(payload,key);
    return TOKEN;
}

function validateToken(token){
    const payload=JWT.verify(token,key);
    return payload;
}
module.exports={
    createToken,
    validateToken,
}