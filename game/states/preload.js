
module.exports = (function() {
	// imports
	var _ = require("underscore");

	var Preload = function() {
		this.asset = null;
		this.ready = false;
	};

	Preload.prototype = {
		preload: function() {
			this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
			this.asset.anchor.setTo(0.5, 0.5);

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.asset);

			// load pngs
			_.each(["player", "background-texture", "rubbish", "bubble"], _.bind(function(item) {
				this.load.image(item, "assets/" + item + ".png");
			}, this));


			this.load.spritesheet('fish', 'assets/fish.png', 64, 104, 6);


			// load background and audio
			this.load.image("ice", "assets/ice.jpg");
			this.load.audio('theme', ['assets/hidden-places.mp3', 'assets/hidden-places.ogg']);
		},
		create: function() {
			this.asset.cropEnabled = false;
		},
		update: function() {
			if(!!this.ready) {
				this.game.state.start('menu');
			}
		},
		onLoadComplete: function() {
			this.ready = true;
		}
	};

	return Preload;
})();