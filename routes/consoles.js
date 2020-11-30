const express = require('express');
const router = express.Router();
const Consoless = require('../models/console');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkConsoleOwner = require('../utils/checkConsoleOwner');

//index
router.get("/", async (req, res) => {
	console.log(req.user);
	try{
		const consoles = await Consoless.find().exec();
	res.render("consoles", {consoles});
	} catch (err) {
		console.log(err);
		res.send("you broke it .... ");
	}
})

// Create
router.post("/", isLoggedIn, async (req, res) => {
	const brand = req.body.brand.toLowerCase();
	const newConsole = {
		title: req.body.title,
		description: req.body.description,
		brand,
		model: req.body.model,
		date: req.body.date,
		issue: req.body.issue,
		color: !!req.body.color,
		image: req.body.image, 
		owner: {
			id: req.user._id,
			username: req.user.username
		},
		upvotes: [req.user.username],
		downvotes: []
	}
	
	try{
		const consol = await Consoless.create(newConsole)
		req.flash("success", "Console Created!");
		res.redirect("/consoles/" + consol._id);
	} catch (err) {
		req.flash("error", "Error Creating console");
		res.redirect("/consoles");
	}
})

// New
router.get("/new", isLoggedIn, (req, res) => {
	res.render("consoles_new");
})

//Search
router.get("/search", async (req, res) => {
	try{
		const consoles = await Consoless.find({
			$text: {
				$search: req.query.term
			}
		})
		res.render("consoles", {consoles});
	} catch (err) {
		console.log(err);
		res.send("Broke search")
	}
})

// Genre
router.get("/brand/:brand", async (req, res) => {
	// Check if the given genre is valid
	const validBrands = ["sony", "microsoft", "nintendo"];
	if (validBrands.includes(req.params.brand.toLowerCase())) {
		const consoles = await Consoless.find({brand: req.params.brand}).exec();
		res.render("consoles", {consoles})
	} else {
		res.send("Please enter a valid genre")
	}
});


// Vote

router.post("/vote", isLoggedIn, async (req, res) => {
	console.log("Resquest body:", req.body);
	
	const consoless = await Consoless.findById(req.body.consolessId)
	console.log(consoless);
	
	res.json(consoless);
})

// Show
router.get("/:id", async (req, res) => {
	try {
		const consoless = await Consoless.findById(req.params.id).exec();
		const comments = await Comment.find({consolessId: req.params.id});
		res.render("consoles_show", {consoless, comments});
	} catch (err) {
		console.log(err);
		res.send("you broke it... //Show part");
	}
})



// Edit
router.get("/:id/edit", checkConsoleOwner, async (req, res) => {
		const consoless = await Consoless.findById(req.params.id).exec();
		res.render("consoles_edit", {consoless});
})

// Updated
router.put("/:id", checkConsoleOwner, async (req, res) => {
	const brand = req.body.brand.toLowerCase();
	const upConsole = {
		title: req.body.title,
		description: req.body.description,
		brand,
		model: req.body.model,
		date: req.body.date,
		issue: req.body.issue,
		color: !!req.body.color,
		image: req.body.image
	}
	try{
		const consoless = await Consoless.findByIdAndUpdate(req.params.id, upConsole, {new: true}).exec();
		req.flash("success", "Console updated!");
		res.redirect(`/consoles/${req.params.id}`)
	} catch (err){
		req.flash("error", "Error updating console");
		res.redirect("/console");
	}
})


// Delete
router.delete("/:id", checkConsoleOwner, async (req, res) => {
	try{
		const deletedConsole = await Consoless.findByIdAndDelete(req.params.id).exec();
		req.flash("success", "Console deleted");
		res.redirect("/consoles");
	} catch (err){
		console.log(err);
		req.flash("error", "Error deleting console")
		res.redirect("back");
	}
})


module.exports = router;