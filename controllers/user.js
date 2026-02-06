const { trusted } = require("mongoose");
const User = require("../models/user");

function handelSignUp(req, res) {
    return res.render("signup")
};
function handelLogIn(req, res) {
    return res.render("login",{err:null});
};

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    try {
        await User.create({
        name: name,
        email: email,
        password: password,
    })
    return res.render("home",{
        name:req.body.name,
    });
    } catch (error) {
        return res.render("signup");
    }
    
}

async function handleUserLogIn(req,res) {
    const {email,password}=req.body;
    try {
        const token=await User.matchPasswordAndTokenGenerator(email,password);
        if(!token) return res.render("login",{err:"Invalid Email or Password !!"});
        return res.cookie("token",token).redirect("/");

     
    
    } catch (error) {
        return res.render("login",{err:"Invalid Email or Password !!"});
    }
}

function handleLogOut(req,res){
    return res.clearCookie('token').redirect('/');
}

module.exports = {
    handelSignUp,
    handelLogIn,
    handleUserSignUp,
    handleUserLogIn,
    handleLogOut,
}