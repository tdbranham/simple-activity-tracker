const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');


//express app
const app = express();

console.log("The port is:" + process.env.PORT);

// connect to mongodb
const dbURI = process.env.MON
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware static files (CSS)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// routes


// blog routes
app.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Events', blogs: result})
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/about/create', (req, res) => {
    res.render('create', { title: 'create' });
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result)=> {
            res.render('details', {blog: result, title: 'Blog Details'});
        })
        .catch((err) => {
            console.log(err);
        })
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect: '/'})
        })
        .catch((err) => {
            console.log(err);
        })
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});