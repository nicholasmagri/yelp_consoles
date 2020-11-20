const Comment = require('../models/comment');

const checkCommentOwner = async (req, res, next) => {
	if(req.isAuthenticated()){ 	// Check if the user is logged in
		// If logged in, check if they own the console
		const comment = await Comment.findById(req.params.commentId).exec();
		// If owner, render the form to edit 
		if(comment.user.id.equals(req.user._id)){
			next();
		} else{
			// If not, redirect back to show page
			res.redirect("back");
		}
	} else {
		res.redirect("/login"); // If not logged in, redirect to /login
	}
}

module.exports = checkCommentOwner;