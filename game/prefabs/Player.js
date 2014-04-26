'use strict';

// imports
var config = require("../config");


// constants
var ACCELERATION = 500;
var MAX_SPEED = 200;
var DRAG = 500;
var HEALTH = 100;
var DISTANCE = 3;
var DROWN = 1;
var EXERTING = 5;


// module vars
var cursors, startPosition;


// class
var Player = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'player', frame);

	// set physics and game specific stuff
	game.physics.enable(this, Phaser.Physics.ARCADE);
	game.add.existing(this);
	game.physics.arcade.setBounds(0, y - 200, game.width, 350);

	this.anchor.setTo(0.5, 0.5);
	this.body.collideWorldBounds = true;
	this.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED / 2);
	this.body.drag.setTo(DRAG, DRAG * 2);

	// start the death timer!
	game.time.events.loop(Phaser.Timer.SECOND * 2, this.drown, this);

	// instance vars
	this.exerting = false;
	this.health = HEALTH;
	
	// set module vars
	cursors = game.input.keyboard.createCursorKeys();
	startPosition = new Phaser.Point(x, y);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	this.exerting = false;
	this.move();
};

Player.prototype.move = function() {
	// left and right movement
	if(cursors.left.isDown) {
		// TODO - swim sideways animation
		this.body.acceleration.x = -ACCELERATION;
		this.game.add.tween(this).to({angle: -40}, 100).start();
	}
	else if(cursors.right.isDown) {
		// TODO - swim sideways animation
		this.body.acceleration.x = ACCELERATION;
		this.game.add.tween(this).to({angle: 40}, 100).start();
	}
	else {
		// TODO - swim animation
		this.body.acceleration.x = 0;

		if(this.angle != 0) {
			this.game.add.tween(this).to({angle: 0}, 100, Phaser.Easing.Bounce.Out).start();
		}
	}

	// up and down movement
	if(cursors.up.isDown) {
		// TODO - swim faster animation
		this.body.acceleration.y = -ACCELERATION;
		this.exerting = true;
	}
	else if(cursors.down.isDown) {
		// TODO - swim slower animation
		this.body.acceleration.y = ACCELERATION;
		this.exerting = true;
	}
	else if(!Phaser.Math.fuzzyEqual(this.y, startPosition.y, DISTANCE)) {
		// TODO - move back to start position
		// TODO - animation wants to be slower / faster depending on position
		this.body.acceleration.y = ACCELERATION / 2 * (this.y > startPosition.y ? -1 : 1);
	}
	else {
		this.body.acceleration.y =	0;
	}
};

Player.prototype.drown = function() {
	// TODO - not if the player is in a air hole
	this.health -= this.exerting ? EXERTING : DROWN;
};

module.exports = Player;
