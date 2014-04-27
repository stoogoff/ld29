
module.exports = (function() {
	var config = require("../config");

	var addHole = function(scroller, key) {
		var image = scroller.game.cache.getImage(scroller.key);
		var radius = scroller.game.rnd.integerInRange(40, 100);
		var x = scroller.game.rnd.integerInRange(0, scroller.game.width);
		var y = scroller.game.rnd.integerInRange(0 + radius, scroller.game.height - radius);

		scroller.airHoles[key] = new Phaser.Circle(scroller[key].x + x, scroller[key].y + y, radius * 2);

		// create the texture from the old image and the circle
		var texture = scroller.game.make.bitmapData(scroller.game.width, scroller.game.height);

		// image data
		texture.context.drawImage(image, 0, 0, scroller.game.width, scroller.game.height);

		// the mask
		texture.context.globalCompositeOperation = "destination-out";

		// circle data
		texture.context.beginPath();
		texture.context.fillStyle = 'rgb(255, 255, 255)';
		texture.context.arc(x, y, radius, 0, Math.PI * 2);
		texture.context.fill();

		// replace the existing image texture with the new texture
		scroller[key].loadTexture(texture);
	};

	var Scroller = function(game, key, speed) {
		this.game = game;
		this.key = key;

		this.image = this.game.add.image(0, 0, key);
		this.image.blendMode = Phaser.blendModes[config.BLEND_MODE];

		this.buffer = this.game.add.image(0, -this.image.height, key);
		this.buffer.blendMode = Phaser.blendModes[config.BLEND_MODE];

		this.speed = speed;
		this.airHoles = {};
	};

	Scroller.prototype.update = function() {
		this.image.y += this.speed;
		this.buffer.y += this.speed;

		if(this.image.y > this.game.height) {
			this.image.y = this.buffer.y - this.image.height;
			addHole(this, "image");
		}

		if(this.buffer.y > this.game.height) {
			this.buffer.y = this.image.y - this.buffer.height;
			addHole(this, "buffer");
		}

		// move airholes
		for(var i in this.airHoles) {
			this.airHoles[i].y += this.speed;
		}
	};

	Scroller.prototype.inAirHole = function(player) {
		var canBreathe = false;

		for(var i in this.airHoles) {
			if(this.airHoles[i].contains(player.x, player.y)) {
				canBreathe = true;
				break;
			}
		}
		
		player.breathe(canBreathe);
	};

	return Scroller;
})();