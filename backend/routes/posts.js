import express from 'express';
import Post from '../models/Post.js';
import verifyToken from '../middleware/authMiddleware.js';
import verifyAdmin from '../middleware/authAdmin.js';  // Optional: Admin middleware

const router = express.Router();

// GET all posts (Everyone can read)
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username email');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
});

// GET single post (Everyone can read)
router.get('/:id',verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err });
  }
});

// CREATE post (Only admin users can create)
router.post('/create',verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, content, image, categories, tags } = req.body;

    // Check for required fields
    if (!title || !content) {
      return res.status(400).json({ message: "Title and Content are required" });
    }

    const newPost = new Post({
      title,
      content,
      author: req.user.id,  // Get the user ID from the token
      image,
      categories,
      tags,
    });

    const savedPost = await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: savedPost });
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
});

// UPDATE post (Only admin users can update)
router.put('/:id',verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, content, image, categories, tags } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content,image, categories, tags },
      { new: true }  // Return the updated post
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err });
  }
});

// DELETE post (Only admin users can delete)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err });
  }
});

export default router;
