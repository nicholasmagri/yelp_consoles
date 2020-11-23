const Consoless = require('../models/console');

const checkConsoleOwner = async (req, res, next) => {
	if(req.isAuthenticated()){ 	// Check if the user is logged in
		// If logged in, check if they own the console
		const consoless = await Consoless.findById(req.params.id).exec();
		// If owner, render the form to edit 
		if(consoless.owner.id.equals(req.user._id)){
			next();
		} else{ // If not, redirect back to show page
			req.flash("error", "You don't have permission to do that!")
			res.redirect("back");
		}
	} else { // If not logged in, redirect to /login
		req.flash("error", "You must be logged in to do that.");
		res.redirect("/login"); 
	}
}

module.exports = checkConsoleOwner;