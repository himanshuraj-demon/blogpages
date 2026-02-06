const express=require("express");
const router=express.Router();
const { handelSignUp, handelLogIn, handleUserSignUp, handleUserLogIn, handleLogOut }=require("../controllers/user");


router.get("/",handelSignUp);
router.get("/login",handelLogIn);
router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogIn);
router.get("/logout",handleLogOut);

module.exports=router;