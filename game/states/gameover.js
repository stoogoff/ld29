
module.exports = (function() {
	var config = require("../config");
	var GameOver = function() {};

	GameOver.prototype = {
		preload: function () {},
		create: function () {
			this.game.stage.backgroundColor = config.BACKGROUND_COLOUR;

			ice = this.game.add.image(0, 0, 'ice');
			ice.blendMode = Phaser.blendModes[config.BLEND_MODE];

			var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
			this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
			this.titleText.anchor.setTo(0.5, 0.5);

			this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Died! Sorry about that.', { font: '32px Arial', fill: '#ffffff', align: 'center'});
			this.congratsText.anchor.setTo(0.5, 0.5);

			this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
			this.instructionText.anchor.setTo(0.5, 0.5);
		},
		update: function () {
			if(this.game.input.activePointer.justPressed()) {
				this.game.state.start('play');
			}
		}
	};

	return GameOver;
})();