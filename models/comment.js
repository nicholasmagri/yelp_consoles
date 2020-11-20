const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	text: String,
	consoleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Consoless"
	}
});

module.exports = mongoose.model("comment", commentSchema);