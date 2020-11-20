const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema({
	title: String,
	description: String,
	brand: String,
	model: String,
	date: Date,
	issue: Number,
	color: Boolean,
	image: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

consoleSchema.index({
	'$**': 'text'
});

module.exports = mongoose.model("console", consoleSchema);

