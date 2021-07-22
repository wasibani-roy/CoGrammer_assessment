const db = require("../models");
const Blog = db.blogs;
const Op = db.Sequelize.Op;

// Create and Save a new Blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const blog = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    userId: req.userId
  };

  // Save Tutorial in the database
  Blog.create(blog)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Blog."
      });
    });
};

// Retrieve all Blogs from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Blog.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Blogs."
        });
        });
  
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Blog.findByPk(id,{
        include: ["user"],
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Blog with id=" + id
        });
      });
};

// Update a Blog by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const user = req.userId;
    console.log(id);
    Blog.update(req.body, {
      where: { id: id , userId: user}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Blog was updated successfully."
          });
        } else {
          res.status(400).send({
            message: `Cannot update Blog with id=${id}. Maybe Blog was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Blog with id=" + id
        });
      });
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    const user = req.userId

    Blog.destroy({
      where: { id: id, userId: user }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Blog was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Blog with id=" + id
        });
      });
};

// Delete all Blogs from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Blogs
exports.findAllPublished = (req, res) => {
  
};
