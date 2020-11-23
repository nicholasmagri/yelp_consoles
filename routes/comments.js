const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Consol = require('../models/console');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/checkCommentOwner');

// New Comment - show form
router.get("/new", isLoggedIn, (req, res) => {
	res.render("comments_new", {consoleId: req.params.id})
})

// Create Comment - Actually Update DB
router.post("/", isLoggedIn, async (req, res) => {
	// create the comment
	try{
		const comment = await Comment.create({
		user: {
			id: req.user._id,
			username: req.user.username
		},
		text: req.body.text,
		consoleId: req.body.consoleId
		});
		req.flash("success", "Comment created!");
		res.redirect(`/consoles/${req.body.consoleId}`)
	} catch (err) {
		req.flash("error", "Error creating comment!");
		res.redirect("/consoles");
	}
})

//Edit Comment - SHow the edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try {
		const consol = await Consol.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		res.render("comments_edit", {consol, comment});
	} catch (err) {
		console.log(err);
		res.redirect("/consoles");
	}
})

// Update Comment - Actually update in DB
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true})
		req.flash("success", "Comment edited");
		res.redirect(`/consoles/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash("error", "Error editing comment");
		res.redirect("/consoles")
	}
})

// Delete Comment - Duh
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		req.flash("success", "Comment deleted");
		res.redirect(`/consoles/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash("error", "Error deleting comment");
		res.redirect("/console");
	}
})


module.exports = router;