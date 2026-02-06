const express=require("express");
const multer=require("multer");
const router=express.Router();
const Blog=require('../models/blog');
const { getUserBlogs, getBlogPage, addBlogs, deleteBlog, profilePage, getForEditBlog, patchForEditBlog }=require('../controllers/blog');
const path=require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get('/',(req,res)=>{
    res.render("addblog");
})
router.get("/profile",profilePage);
router.get('/myblog', getUserBlogs);
router.get('/:id',getBlogPage)
router.post('/',upload.single('coverImg'),addBlogs)
router.get("/edit/:id",getForEditBlog);
router.post('/delete/:id', deleteBlog);
router.patch("/:id", upload.single("coverImg"), patchForEditBlog);

module.exports=router;