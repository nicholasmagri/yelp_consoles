// ====================
// SELECT ELEMENTS
// ====================

const upvoteBtn = document.getElementById("upvote_btn");
const downvoteBtn = document.getElementById("downvote_btn");


// ====================
// ADD EVENT LISTENERS
// ====================
upvoteBtn.addEventListener("click", async function() {
	const options = {
		method: "POST",
		headers: {
			'Content-Type': 'application/json' 
		},
		body: JSON.stringify({vote: "up"})
	}
	
	await fetch("/consoles/vote", options)
	.then(data => {
		return data.json()
	})
	.then(res => {
		console.log(res)
	})
	.catch(err => {
		console.log(err)
	})
})

downvoteBtn.addEventListener("click", async function() {
	console.log("clicked");
})