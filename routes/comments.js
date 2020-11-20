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
		console.log(comment);
		res.redirect(`/consoles/${req.body.consoleId}`)
	} catch (err) {
		console.log(err);
		res.send("Broken again... Post comments.js");
	}
})

//Edit Comment - SHow the edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try {
		const consol = await Consol.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("consol:", consol)
		console.log("comment_edit", comment)
		res.render("comments_edit", {consol, comment});
	} catch (err) {
		console.log(err);
		res.send("Broke Comment edit Get")
	}
})

// Update Comment - Actually update in DB
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true})
		console.log(comment);
		res.redirect(`/consoles/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Brokee Comment PUT")
	}
})

// Delete Comment - Duh
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/consoles/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Boken again comment delete")
	}
})


module.exports = router;