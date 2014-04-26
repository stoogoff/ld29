'use strict';

// imports
var Player = require("../prefabs/Player");
var config = require("../config");

// module vars
var player, circle, hud;

function Play() {}

Play.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#145bc6';
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		circle = new Phaser.Circle(this.game.width / 2, this.game.height - 200, 10);
		player = new Player(this.game, circle.x, circle.y);
		hud = this.game.add.text(10, 10, "Health: " + player.health, { font: "14px Arial", fill: "#fff"});
	},
	update: function() {
		hud.text = "Health: " + player.health;
	},
	render: function() {
		if(!config.DEBUG)
			return;

		this.game.debug.geom(circle, 'rgba(255,0,0,1)');
	}
};

module.exports = Play;