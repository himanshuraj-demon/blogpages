require('dotenv').config();
const express=require("express");
const path=require("path")
const cookieParcher=require("cookie-parser");
const methodOverride=require("method-override")

const {connectDB}=require("./connection");
const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");
const { checkForAuthontication, requireAuth} = require('./middlewares/auth');
const Blog=require('./models/blog');

const app=express();

connectDB(process.env.MONGO_URL);

app.use(methodOverride('_method'));
app.use(cookieParcher())
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(checkForAuthontication("token"))
app.use(express.static(path.resolve('public')));
app.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
  res.locals.activePath = req.path;
  next();
});

app.set("views",path.resolve("./views"));
app.set("view engine","ejs");

app.use("/user",userRoute);
app.use("/blog",requireAuth,blogRoute);


app.get("/error",(req,res)=>{
    return res.render("error");
})
app.get("/",async (req,res)=>{
    try {
        const allBlogs=await Blog.find({});
        return res.render("home",
        {user:req.user,
        blogs:allBlogs||null,
        })
    } catch (error) {
        return res.render("error");
    }
    
})

app.listen(process.env.PORT || 3000,()=>console.log("server started"))