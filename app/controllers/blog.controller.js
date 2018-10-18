const url = require("url");
const Blog = require("../models/blog.model");

createBlog = function(req, res){
    if(!req.body.title || !req.body.authorName) {
        res.status(400).send({ message: "Blog title and author name can not be empty." });
    }
    const blog = new Blog({
        title: req.body.title, 
        authorId: req.body.authorId,
        authorName: req.body.authorName,
        description: req.body.description,
        content: req.body.content,
        source: req.body.source,
        destination: req.body.destination,
        route: req.body.route
    });

    blog.save()
    .then(function(data){ res.send(data);})
    .catch(function(err){ res.status(500).send({ message: err.message || "Some error occurred while creating the blog." });
    });
};

updateBlog = function(req, res){
    if(!req.body){
        res.status(404).send({ message: "Blog content can not be empty" });
    }
    Blog.findByIdAndUpdate(
        req.params.blogId, 
        req.body, 
        {new: true})
    .then(function(blog){
        if(!blog) {
            res.status(404).send({ message: "Blog not found with id " + req.params.blogId });
        }
        res.send(blog);})
    .catch(function(err){
        if(err.kind === 'ObjectId') {
            res.status(404).send({ message: "Blog not found with id " + req.params.blogId });                
        }
        res.status(500).send({ message: "Error updating note with id " + req.params.blogId });
    });
};

findBlogById = function(req, res){
    Blog.findById(req.params.blogId)
    .then(function(blog){
        if(!blog){
            res.status(404).send({ message: "Blog not found with id" + req.params.blogId });
        }
        res.send(blog);})
    .catch(function(err){
        if(err.kind == "ObjectId"){
            res.status(404).send({ message: "Blog not found with id " + req.params.blogId });
        }
        res.status(500).send({message: "Error retrieving blog with id " + req.params.blogId });
    });
};

deleteBlogById = function(req, res){
    Blog.findByIdAndRemove(req.params.blogId)
    .then(function(blog){
        if(!blog) {
            res.status(404).send({ message: "Blog not found with id " + req.params.blogId });
        }
        res.send({ message: "Blog deleted successfully!"});
    }).catch(function(err){
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            res.status(404).send({ message: "Blog not found with id " + req.params.blogId
            });                
        }
        res.status(500).send({ message: "Could not delete blog with id " + req.params.blogId });
    });
};

findAllBlogs = function(req, res){
    Blog.find()
    .then(function(blogs){
        res.send(blogs);
    }).catch(function(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving blogs."
        });
    });
};

findBlogByAuthorName = function(req, res){
    Blog.find({ authorName: req.params.authorName })
    .then(function(blogs){
        res.send(blogs);
    }).catch(function(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving blogs."
    });
  });
};

findBlogByQuery = function(req, res){
    console.log(req.url);
    const urlParts = url.parse(req.url, true);
    const query = urlParts.query;
    console.log(query);
    Blog.find(query)
    .then(function(blogs){
        res.send(blogs);
    }).catch(function(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving blogs."
        });
    });
};

module.exports = {
    createBlog: createBlog,
    updateBlog: updateBlog,
    findBlogById: findBlogById,
    findBlogByAuthorName: findBlogByAuthorName,
    findBlogByQuery: findBlogByQuery,
    findAllBlogs: findAllBlogs,
    deleteBlogById: deleteBlogById
}