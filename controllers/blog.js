const Blog=require('../models/blog');

async function getUserBlogs(req,res) {
    const mybloger = await Blog.find({
        createdBy: req.user._id  
    });

    return res.render("myblog",{
        user:req.user,
        blogs: mybloger,
    });
    
}

async function getBlogPage(req,res) {
    const blog=await Blog.findById(req.params.id);
    const blogs=await Blog.find({});
    return res.render("blog",{
        user:req.user,
        blog,
        blogs,
    })
    
}

async function addBlogs(req,res) {
    const {title,body}=req.body;
    const coverImgPath = req.file
   ? `/uploads/${req.file.filename}`
   : "/images/defualblog.jpeg";
    const blog= await Blog.create({
        title:title,
        body:body,
        createdBy:req.user._id,
        coverImg:coverImgPath,
    })
    return res.redirect("/blog/myblog");
    
}

async function deleteBlog(req,res) {

    await Blog.findByIdAndDelete(req.params.id);

    return res.redirect('/blog/myblog');
    
}

async function profilePage(req,res){

   const totalBlogs = await Blog.countDocuments({
      createdBy: req.user._id
   });

   return res.render("userprofile",{
      user:req.user,
      totalBlogs,
      activePage:"profile"
   });
}

async function getForEditBlog(req,res) {
    const blog = await Blog.findById(req.params.id);

   return res.render("editblog",{
      blog,
      activePage:"edit"
   });
    
}
async function patchForEditBlog(req,res) {
    const updateData = {
      title:req.body.title,
      body:req.body.body
   };

   if(req.file){
      updateData.coverImg = `/uploads/${req.file.filename}`;
   }

   await Blog.findByIdAndUpdate(req.params.id, updateData);

   return res.redirect(`/blog/${req.params.id}`);
    
}

module.exports={
    getUserBlogs,
    getBlogPage,
    addBlogs,
    deleteBlog,
    profilePage,
    getForEditBlog,
    patchForEditBlog,
}