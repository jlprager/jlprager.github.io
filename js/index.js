
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var platform;
var player;
var stars;
var cursors;
var resStar;

// var scoreText;
// var score = 0;


function preload() {

	game.load.image("sky", "assets/sky.png");
	game.load.image("ground", "assets/platform.png");
	game.load.image("star", "assets/star.png");
	game.load.spritesheet("dude", "assets/DannyWalk.png", 62, 56, 9);
}

function create() {
	// game.add.sprite(0, 0, "star");

	//SCENE
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, "sky");
	platforms = game.add.group();
	platforms.enableBody = true;
	var ground = platforms.create(0, game.world.height - 64, "ground");
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;
	var ledge = platforms.create(400, 400, "ground");
	ledge.body.immovable = true;
	ledge = platforms.create(-150, 250, "ground");
	ledge.body.immovable = true;
	ledge = platforms.create(450, 150, "ground");
	ledge.body.immovable = true;

	//PLAYER
	player = game.add.sprite(32, game.world.height - 150, "dude");
	game.physics.arcade.enable(player);
	player.body.bounce.y = .2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;
	player.animations.add("left", [0, 1], 5, true);
	player.animations.add("right", [6, 7], 5, true);

	//CURSOR CONTROLS
	cursors = game.input.keyboard.createCursorKeys();

	//STARS
	stars = game.add.group();
	stars.enableBody = true;
	resStar = stars.create(750, 370, "star");
	portStar = stars.create(60, 220, "star");
	conStar = stars.create(600, 120, "star");

	// for(var i = 0; i < 10; i++){
	// 	var star = stars.create(i * 70, 0, "star");
	// 	star.body.gravity.y = 6;
	// 	star.body.bounce.y = 0.7 + Math.random() * 0.2;
	// }

	//SCORE
	// scoreText = game.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#000" });
}

function update() {

	//COLLISONS
	game.physics.arcade.collide(player, platforms);

	//CONTROLS
	player.body.velocity.x = 0;
	if(cursors.left.isDown){
		player.body.velocity.x = -150;
		player.animations.play("left");
	}
	else if(cursors.right.isDown){
		player.body.velocity.x = 150;
		player.animations.play("right");
	}
	else{
		player.animations.stop();
		player.frame = 4;
	}

	if(cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -320;
	}

	//STAR COLLISIONS
	// game.physics.arcade.collide(resStar, platforms);
	game.physics.arcade.overlap(player, resStar, resHandler, null, this);
	game.physics.arcade.overlap(player, portStar, portHandler, null, this);
	game.physics.arcade.overlap(player, conStar, conHandler, null, this);
}

function resHandler(player, star){
	star.kill();
	// document.getElementById("resButt").removeAttribute("disabled");
	document.getElementById("resButt").setAttribute("href", "resume");
	document.getElementById("resButt").classList.remove("disabled");
}

function portHandler(player, star){
	star.kill();
	document.getElementById("portButt").setAttribute("href", "portfolio");
	document.getElementById("portButt").classList.remove("disabled");
}

function conHandler(player, star){
	star.kill();
	document.getElementById("conButt").setAttribute("href", "contact");
	document.getElementById("conButt").classList.remove("disabled");
}

document.getElementById("skip").addEventListener("click", function() {
	document.getElementById("resButt").setAttribute("href", "resume");
	document.getElementById("portButt").setAttribute("href", "portfolio");
	document.getElementById("conButt").setAttribute("href", "contact");
	document.getElementById("resButt").classList.remove("disabled");
	document.getElementById("portButt").classList.remove("disabled");
	document.getElementById("conButt").classList.remove("disabled");
	
})
