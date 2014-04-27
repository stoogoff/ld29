
module.exports = (function() {
	// imports
	var Player = require("../prefabs/Player");
	var FishGroup = require("../prefabs/Fish");
	var RubbishGroup = require("../prefabs/Rubbish");
	var Status = require("../prefabs/Status");
	var Scroller = require("../prefabs/Scroller");
	var config = require("../config");

	// module vars
	var player, circle, hud, health, fishes, rubbish, scroller;

	// classes
	var Play = function() {};

	Play.prototype = {
		create: function() {
			this.game.stage.backgroundColor = config.BACKGROUND_COLOUR;
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
		},
		update: function() {
			// the player is dead, end the game
			if(player.health <= 0) {
				this.game.state.start('gameover');
			}

			this.game.physics.arcade.collide(player, fishes, this.collision, null, this);
			this.game.physics.arcade.collide(player, rubbish, this.collision, null, this);

			scroller.update();
		},
		/*render: function() {
			if(!config.DEBUG)
				return;

			this.game.debug.geom(circle, 'rgba(255,0,0,1)');
		},*/
		collision: function(player, obj) {
			player.health -= obj.damage;
			player.staggered(obj.damage * 15);

			// TODO - death state for the object
			obj.destroy();
		}
	};

	return Play;
})();