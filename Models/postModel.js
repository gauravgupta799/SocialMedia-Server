const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true},
		desc: String,
        image:String,
        likes:[],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
