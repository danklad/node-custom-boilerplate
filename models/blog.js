const mongoose = require("mongoose");
const { ModuleResolutionKind } = require("typescript");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type: String,
        required : true
    }


},{timestamps: true});

const Blog = mongoose.model('blog',blogSchema);

module.exports = Blog;