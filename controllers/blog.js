const Blog=require('../models/blog');
const Comment=require('../models/comments');

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
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    const blogs=await Blog.find({});
    const comments=await Comment.find({BlogId:req.params.id}).populate("createdBy");
    return res.render("blog",{
        blog,
        blogs,
        comments,
        
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
async function handleComments(req,res) {
    await Comment.create({
      content:req.body.content,
      BlogId:req.params.blogId,
      createdBy:req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`);
}

async function commentDelete(req,res) {
    const comment = await Comment.findById(req.params.commentId);

    if(!comment){
        return res.status(404).send("Comment not found");
    }

    const blog = await Blog.findById(comment.BlogId);


    if(!req.user){
        return res.redirect("/login");
    }

    const isCommentOwner = comment.createdBy.toString() === req.user._id.toString();
    const isBlogOwner = blog.createdBy.toString() === req.user._id.toString();

    if(!isCommentOwner && !isBlogOwner){
        return res.status(403).send("Not allowed");
    }
    await Comment.findByIdAndDelete(req.params.commentId);

    res.redirect(`/blog/${comment.BlogId}`);
    
}
module.exports={
    getUserBlogs,
    getBlogPage,
    addBlogs,
    deleteBlog,
    profilePage,
    getForEditBlog,
    patchForEditBlog,
    handleComments,
    commentDelete,
}