const { authJwt } = require("../middleware");

module.exports = app => {
    const blogs = require("../controllers/blog.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Blog
    router.post("/",authJwt.verifyToken, blogs.create);
  
    // Retrieve all blogs
    router.get("/", blogs.findAll);
  
    // Retrieve all published blogs
    router.get("/published", blogs.findAllPublished);
  
    // Retrieve a single Blog with id
    router.get("/:id", blogs.findOne);
  
    // Update a Blog with id
    router.put("/:id", authJwt.verifyToken, blogs.update);
  
    // Delete a Blog with id
    router.delete("/:id", authJwt.verifyToken, blogs.delete);
  
    app.use('/api/blogs', router);
  };