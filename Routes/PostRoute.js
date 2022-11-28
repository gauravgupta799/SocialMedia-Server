const router = require("express").Router();
const {
	createPost,
	getPost,
	deletePost,
	updatePost,likePost
} = require("../Controllers/PostController.js");

router.post("/createNewPost", createPost);
router.get("/getPost/:id", getPost);
router.delete("/deletePost/:id", deletePost);
router.put("/update/:id", updatePost);
router.put('/like/:id', likePost);

module.exports = router;
