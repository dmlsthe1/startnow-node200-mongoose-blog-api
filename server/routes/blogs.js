const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

router.get("/", (req, res) => {

    Blog.find()
    .then(blog => {
        res.status(200).json(blog);
    }).catch(err => res.status(500).send("bad"));
});

router.get("/featured", (req, res) => {

    Blog.where("featured", true)
    .then(blog => {
        res.status(200).json(blog);
    }).catch(err => res.status(500).send("bad"));
});

router.get("/:id", (req, res) => {

    Blog.findById(req.params.id)
    .then(blog => {
        if (!blog) return res.sendStatus(404);
        res.status(200).json(blog);
    }).catch(err => res.status(500).send("bad"));
});

router.post("/", (req, res) => {
    
    let dbUser = null;

    User.findById(req.query.userId)
    .then(user => {
        dbUser = user;
        var newBlog = new Blog(req.body);
        newBlog.author = user._id;
        return newBlog.save();        
    }).then(blog => {
        dbUser.blogs.push(blog);
        dbUser.save().then(() => {
            res.status(201).json(blog);
        })
    }).catch(err => res.status(500).send("bad"));
});

router.put("/:id", (req, res) => {

    Blog.findByIdAndUpdate(req.params.id, {$set: req.body})
    .then(blog => {
        if (!blog) return res.sendStatus(404);
        res.status(204).json(blog);
    }).catch(err => res.status(500).send("bad"));
});

router.delete("/:id", (req, res) => {

    Blog.findByIdAndRemove(req.params.id)
    .then(blog => {
        if (!blog) return res.sendStatus(404);
        res.status(200).json(blog);
    }).catch(err => res.status(500).send("bad"));
})


module.exports = router;