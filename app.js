const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const port = process.env.port || 3000;

const app = express();

//Connect to Database
const dbURI = 'mongodb+srv://surya:leavemealone@codebrigade.ovye0.mongodb.net/CodeBrigade?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => {  
        console.log("connected to database");
        app.listen(port, () => {              // listening for port here because we don't want to host unless our database is connected
            console.log("server is up and runnin!");
        });
    })
    .catch((err) => console.log(err));

//view engine
app.set('view engine', 'ejs')

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// app.use((req, res, next) => {
//     console.log("hi")
//     next();
// });

// app.get('/add-blog',(req,res)=>{
//     const newBlog = new Blog({
//         title: "Tech Brigade",
//         content: "About tech brigade!!"
//     });
//     newBlog.save()
//         .then((result) =>{
//             res.send(result.title);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// });



// app.get('/all-blogs', (req,res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result[0].content);
//         })
//         .catch((err)=>{
//             console.log(err)
        
//         })
// });

app.get("/", (req, res) => {
    // const objects = [{
    //     title: 'first blog',
    //     content: 'tech blog'
    // },
    // {
    //     title: 'second blog',
    //     content: 'tech blog2'
    // }]
    // res.render("index", {
    //     titleExtension: "Home",
    //     objects: objects
    // });
    res.redirect("/blogs");
});




app.post('/blogs',(req,res)=>{

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
    
});

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result =>{
        res.render('details',{titleExtension: req.body.title,blog: result });
        })
        .catch(err => {
            console.log(err);
        })
    
})



app.get("/blogs",(req,res)=>{
    Blog.find()
        .then((result) =>{
            res.render('index',{titleExtension:'All Blogs',blogs: result});
        
            
        })
        .catch((err)=>{
            console.log(err);
        })
});


app.get("/about", (req, res) => {

    res.render("about", {
        titleExtension: "About"
    });
});

app.get("/blog/create", (req, res) => {

    res.render("create", {
        titleExtension: "Create Blog"
    })
});



//404 status page  (this has to be in the bottom)

app.use((req, res) => {
    res.render("404", {
        titleExtension: "404"
    });
})