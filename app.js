const express = require('express');
const mongoose = require('mongoose');

const blogRouter = require('./routes/blogRoutes');
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






app.get("/about", (req, res) => {

    res.render("about", {
        titleExtension: "About"
    });
});



//blog routes

app.use('/blogs',blogRouter);




//404 status page  (this has to be in the bottom)

app.use((req, res) => {
    res.render("404", {
        titleExtension: "404"
    });
})