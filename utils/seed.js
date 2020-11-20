const Console = require('../models/console');
const Comment = require('../models/comment');


const console_seeds = [
		{
			title: "Playstation 5",
			description: "The PlayStation 5 features a customized solid-state drive designed for high-speed data streaming to enable significant improvements in graphical performance. The hardware also features a custom AMD GPU capable of ray tracing, support for 4K resolution displays and up to 120 frames per second, new audio hardware for real-time 3D audio effects, and backward compatibility with most PlayStation 4 and PlayStation VR games.",
			brand: "Sony",
			model: "Playstation 5",
			date: "2020-10-23",
			issue: 20,
			color: true,
			image: "https://blogdojuares.com.br/img-noticia/g/img_50219_foto_1.jpg"
		},
		{
			title: "Xbox Series X",
			description: "Microsoft is prioritizing hardware performance, including support for higher display resolutions (up to 8K resolution) along with frame rates, real-time ray tracing, and use of high-speed solid-state drive to reduce loading times, on the Xbox Series X. Microsoft is promoting a gamer-centric approach to their new hardware, including free upgrades which are enhanced versions of Xbox One games via their Smart Delivery initiative, games optimized for the Series X hardware, and backward compatibility with previous generation Xbox games, controllers and accessories. The console will also take advantage of their game subscription service Xbox Game Pass, as well as remote cloud gaming on mobile devices via their cloud game-streaming platform xCloud.",
			brand: "Microsoft",
			model: "Xbox Series X",
			date: "2020-10-23",
			issue: 20,
			color: true,
			image: "https://s2.glbimg.com/mExUtiii01VMzu32CniCilzwhhk=/0x0:695x390/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/j/q/JpBqQBQaq9C7DX9TKSDg/xbox-series-x-possivel-preco.jpg"
		},
		{
			title: "Nintendo Switch",
			description: "The Nintendo Switch is a hybrid video game console, consisting of a console unit, a dock, and two Joy-Con controllers. Although it is a hybrid console, Nintendo classifies it as a home console that you can take with you on the go",
			brand: "Nintendo",
			model: "Nintendo Switch",
			date: "2020-10-23",
			issue: 20,
			color: true,
			image: "https://media.istockphoto.com/photos/nintendo-switch-joycon-controller-on-a-white-background-picture-id1226555930?k=6&m=1226555930&s=612x612&w=0&h=-bBbtKZIiGcDdNDtBR-20Soh-yeIPvFoXROPmzXtGIE="
		}
]

const seed = async () => {
	// Delete all the current consoles and comments
	await Console.deleteMany();
	console.log("Deleted All the Consoles!")
	
	await Comment.deleteMany();
	console.log("Deleted All the Comments!")
	/*
	// Create three new consoles
	for (const console_seed of console_seeds) {
		let consolee = await Console.create(console_seed);
		console.log("Created a new console!", consolee.title)
		// Console a new comment for each comi
		await Comment.create({
			text: "I ruved this new Console!",
			user: "Nintendo",
			consoleeId: consolee._id
		})
		console.log("Created a new Comment!")
	}
	*/
}

module.exports = seed;