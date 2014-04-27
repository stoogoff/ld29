
module.exports = (function() {
	var config = require("../config");

	var Menu = function() {};

	Menu.prototype = {
		preload: function() {},
		create: function() {
			var music = this.game.add.audio('theme', 1, true);
    		
    		music.play('', 0, 1, true);

			this.game.stage.backgroundColor = config.BACKGROUND_COLOUR;

			ice = this.game.add.image(0, 0, 'ice');
			ice.blendMode = Phaser.blendModes[config.BLEND_MODE];

			var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};

			this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Drowning Man', style);
			this.titleText.anchor.setTo(0.5, 0.5);

			this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play', { font: '16px Arial', fill: '#ffffff', align: 'center'});
			this.instructionsText.anchor.setTo(0.5, 0.5);
		},
		update: function() {
			if(this.game.input.activePointer.justPressed()) {
				this.game.state.start('play');
			}
		}
	};

	return Menu;
})();