
module.exports = (function() {
	var DAMAGE = 25;

	var Rubbish = function(game, x, y, frame) {
		Phaser.Sprite.call(this, game, x, y, 'rubbish', frame);

		game.physics.enable(this, Phaser.Physics.ARCADE);

		this.anchor.setTo(0.5, 0.5);
		this.body.velocity.y = 100 + this.game.rnd.integerInRange(-25, 25);

		this.target = game.rnd.integerInRange(0, game.width);
		this.damage = DAMAGE;
		this.rotate = this.game.rnd.integerInRange(-2, 2);

		// move based on the easing of the rubbish
		this.game.add.tween(this).to({ x: this.target }, 5000 * (2.5 + game.rnd.frac()), Phaser.Easing.Linear.None, true);
	};

	Rubbish.prototype = Object.create(Phaser.Sprite.prototype);
	Rubbish.prototype.constructor = Rubbish;

	Rubbish.prototype.update = function() {
		if(this.y > this.game.height + this.height) {
			this.destroy();
		}

		this.angle += this.rotate;
	};

	var RubbishGroup = function(game, parent) {
		Phaser.Group.call(this, game, parent);
	};

	RubbishGroup.prototype = Object.create(Phaser.Group.prototype);
	RubbishGroup.prototype.constructor = RubbishGroup;

	RubbishGroup.prototype.addRubbish = function() {
		this.add(new Rubbish(this.game, this.game.rnd.integerInRange(0, this.game.width), -20));
	};

	return RubbishGroup;
})();