const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    BlogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
}, { timestamps: true });

const Comment = new mongoose.model("comment", commentSchema);

module.exports=Comment;