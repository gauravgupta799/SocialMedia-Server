const PostModel = require("../Models/postModel.js");

// Create New Post
const createPost = async (req, res) => {
	const newPost = new PostModel(req.body);
	try {
		await newPost.save();
		res.status(200).json({ msg: "Post created!" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get a Post
const getPost = async (req, res) => {
	const id = req.params.id;
	try {
		const post = await PostModel.findById(id);
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Update a Post
const updatePost = async (req, res) => {
	const postId = req.params.id;
	const { userId } = req.body;
	try {
		const post = await PostModel.findById(postId);
		if (post.userId === userId) {
			await post.updateOne({
				$set: req.body,
			});
			res.status(200).json({ msg: "Post updated!" });
		} else {
			res.status(403).json({ msg: "Action forbidden!" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Delete a Post
const deletePost = async (req, res) => {
	const postId = req.params.id;
	const { userId } = req.body;
	try {
		const post = await PostModel.findById(postId);
		if (post.userId === userId) {
			await post.deleteOne();
			res.status(200).json({ msg: "Post deleted successfully!" });
		} else {
			res.status(403).json({ msg: "Action forbidden!" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// like/dislike a post
const likePost = async (req, res) => {
	const id = req.params.id;
	const { userId } = req.body;
	try {
		const post = await PostModel.findById(id);
		if (!post.likes.includes(userId)) {
			await post.updateOne({ $push: { likes: userId } });
			res.status(200).json({ msg: "Post liked" });
		} else {
			await post.updateOne({ $pull: { likes: userId } });
			res.status(200).json({ msg: "Post unliked " });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { createPost, getPost, updatePost, deletePost, likePost };
