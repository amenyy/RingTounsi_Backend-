// post.controller.js
const PostModel = require("../models/post.model");

const getAllPosts = (req, res) => {
  const postModelInstance = new PostModel();
  postModelInstance.getAllPosts((error, results) => {
    if (error) {
      console.error("Error in getAllPosts query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const getPostById = (req, res) => {
  const { id } = req.params;
  const postModelInstance = new PostModel();
  postModelInstance.getPostById(id, (error, post) => {
    if (error) {
      console.error("Error in getPostById query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(post);
    }
  });
};

const createPost = async (req, res) => {
  const { coachId, description, imageUrl, videoUrl, text } = req.body;
  try {
    const postModelInstance = new PostModel();
    postModelInstance.addPost(
      { coachId, description, imageUrl, videoUrl, text },
      (error, post) => {
        if (error) {
          console.error("Error in createPost query:", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Result from createPost:", post);
          res.json({ message: "Post added successfully", post });
        }
      }
    );
  } catch (error) {
    console.error("Error in createPost:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { description, imageUrl, videoUrl, text } = req.body;
  const postModelInstance = new PostModel();
  postModelInstance.updatePost(
    id,
    { description, imageUrl, videoUrl, text },
    (error, result) => {
      if (error) {
        console.error("Error in updatePost query:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Post updated successfully" });
      }
    }
  );
};

const deletePost = (req, res) => {
  const { id } = req.params;
  const postModelInstance = new PostModel();
  postModelInstance.deletePost(id, (error, result) => {
    if (error) {
      console.error("Error in deletePost query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Post deleted successfully" });
    }
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
