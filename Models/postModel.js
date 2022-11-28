const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true},
		desc: { type: String},
        image: { type: String},
        likes:[],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
