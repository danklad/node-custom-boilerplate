const Blog = require('../models/blog');




const blog_index = (req,res) =>{
    Blog.find()
        .then((result) =>{
            res.render('index',{titleExtension:'All Blogs',blogs: result});
        
            
        })
        .catch((err)=>{
            console.log(err);
        })

}

const blog_create_get = (req,res) =>{
    res.render("create", {
        titleExtension: "Create Blog"
    })
}

const blog_create_post = (req,res) =>{
    var newBlog = new Blog({
        title: req.body.title,
        content: req.body.body
    });
    newBlog.save()
        .then((result)=>{
            // console.log(result);
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err);
        })

//     Blog.findOne({title:'eminem'})
//         .then((result)=>{
//             console.log(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
    
}

const blog_details=(req,res) =>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result =>{
        res.render('details',{titleExtension: req.body.title,blog: result });
        })
        .catch(err => {
            console.log(err);
        })
}







//exports
module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details
}