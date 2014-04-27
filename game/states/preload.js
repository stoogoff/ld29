
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
			_.each(["player", "background-texture", "fish", "rubbish"], _.bind(function(item) {
				this.load.image(item, "assets/" + item + ".png");
			}, this));

			// load background
			this.load.image("ice", "assets/ice.jpg");
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