
var Fish = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'fish', frame);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.anchor.setTo(0.5, 0.5);
	this.body.velocity.y = 200 + this.game.rnd.integerInRange(-30, 30);

	this.easing = game.rnd.pick(Fish.easings);
	this.target = game.rnd.integerInRange(0, game.width);;
	this.damage = 10;

	// move based on the easing of the fish
	this.game.add.tween(this).to({ x: this.target }, 1500 * (1 + game.rnd.frac()), this.easing, true, 0, 1000, true);
};

Fish.prototype = Object.create(Phaser.Sprite.prototype);
Fish.prototype.constructor = Fish;

Fish.prototype.update = function() {
	if(this.y > this.game.height + this.height) {
		this.destroy();
	}

	// TODO - fish should point in the direction their going
	//var angle = Phaser.Math.radToDeg(this.game.physics.arcade.angleToXY(this, this.target, this.game.height)) - 90;
	//var angle = this.game.physics.arcade.angleBetween(this, { x: this.target, y: this.game.height }) - 90;

	//console.log(angle)

	//this.rotation = angle;
};
Fish.easings = [Phaser.Easing.Linear.None, Phaser.Easing.Back.In, Phaser.Easing.Back.Out, Phaser.Easing.Back.InOut];

var FishGroup = function(game, parent) {
	Phaser.Group.call(this, game, parent);
};

FishGroup.prototype = Object.create(Phaser.Group.prototype);
FishGroup.prototype.constructor = FishGroup;

FishGroup.prototype.addFish = function() {
	this.add(new Fish(this.game, this.game.rnd.integerInRange(0, this.game.width), -20));
};


module.exports = FishGroup;