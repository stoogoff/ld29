
module.exports = (function() {
	var config = require("../config");
	var image, buffer;

	var Scroller = function(game, key, speed) {
		this.game = game;

		image = this.game.add.image(0, 0, key);
		image.blendMode = Phaser.blendModes[config.BLEND_MODE];

		buffer = this.game.add.image(0, -image.height, key);
		buffer.blendMode = Phaser.blendModes[config.BLEND_MODE];

		this.speed = speed;
	};

	Scroller.prototype.update = function() {
		image.y += this.speed;
		buffer.y += this.speed;

		if(image.y > this.game.height)
			image.y = buffer.y - image.height;

		if(buffer.y > this.game.height)
			buffer.y = image.y - buffer.height;
	};

	return Scroller;
})();