
module.exports = (function() {
	// imports
	var Player = require("../prefabs/Player");
	var FishGroup = require("../prefabs/Fish");
	var RubbishGroup = require("../prefabs/Rubbish");
	var Status = require("../prefabs/Status");
	var Scroller = require("../prefabs/Scroller");
	var config = require("../config");

	// module vars
	var player, circle, hud, health, fishes, rubbish, scroller, time;

	var pad = function(num) {
		return num < 10 ? '0' + num : num;
	};

	// classes
	var Play = function() {};

	Play.prototype = {
		create: function() {
			time = 0;

			this.game.stage.background = this.game.stage.background = this.game.add.image(0, 0, 'sea');
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			circle = new Phaser.Circle(this.game.width / 2, this.game.height - 200, 10);
			player = new Player(this.game, circle.x, circle.y);

			fishes = new FishGroup(this.game);
			rubbish = new RubbishGroup(this.game);
			scroller = new Scroller(this.game, 'ice', 2);
			health = new Status(this, 10, 10, 150, 15, player, "health");

			this.gen1 = this.game.time.events.loop(Phaser.Timer.SECOND * 2, fishes.addFish, fishes);
			this.gen1.timer.start();

			this.gen2 = this.game.time.events.loop(Phaser.Timer.SECOND * 5, rubbish.addRubbish, rubbish);
			this.gen2.timer.start();

			this.difficulty = this.game.time.events.loop(Phaser.Timer.SECOND * 15, this.rampUp, this);
			this.difficulty.timer.start();

			this.score = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateScore, this);
			this.score.timer.start();

			this.scoreText = this.game.add.text(this.game.width - 100, 10, 'Time: 00:00', { font: 'bold 16px Arial', fill: '#114ea7' });
		},
		rampUp: function() {
			scroller.decreaseAirHoleChance();
		},
		updateScore: function() {
			++time;
		},
		update: function() {
			// the player is dead, end the game
			if(player.health <= 0) {
				this.game.state.start('gameover');
			}

			this.game.physics.arcade.collide(player, fishes, this.collision, null, this);
			this.game.physics.arcade.collide(player, rubbish, this.collision, null, this);

			scroller.update();
			scroller.inAirHole(player);

			this.scoreText.text = 'Time: ' + pad(Math.floor(time / 60)) + ':' + pad(time % 60);
		},
		paused: function() {
			this.gen1.timer.pause();
			this.gen2.timer.pause();
		},
		collision: function(player, obj) {
			player.health -= obj.damage;
			player.staggered(obj.damage * 15);

			// TODO - death state for the object
			obj.destroy();
		}
	};

	return Play;
})();