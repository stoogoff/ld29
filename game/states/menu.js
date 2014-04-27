
module.exports = (function() {
	var config = require("../config");

	var Menu = function() {};

	Menu.prototype = {
		preload: function() {},
		create: function() {
			var music = this.game.add.audio('theme', 1, true);
    		
    		music.play('', 0, 1, true);

			this.game.stage.background = this.game.add.image(0, 0, 'sea');

			var message = [
				'See how long you can survive the icy waters.',
				'Use the cursor keys to swim in any direction. Swimming forward against the current or pulling back will tire you, as will bumping into things. Use holes in the ice to rest and see how long you can survive.',
				'Click anywhere to play',
			];

			this.titleText = this.game.add.text(this.game.world.centerX, 200, 'Drowning Man', config.MENU_HEADING);
			this.titleText.anchor.setTo(0.5, 0.5);

			this.instructionsText = this.game.add.text(this.game.world.centerX, 400, message.join('\n\n'), { font: '16px Arial', fill: '#ffffff', align: 'center'});
			this.instructionsText.anchor.setTo(0.5, 0.5);
			this.instructionsText.wordWrap = true;
			this.instructionsText.wordWrapWidth = 400;
		},
		update: function() {
			if(this.game.input.activePointer.justPressed()) {
				this.game.state.start('play');
			}
		}
	};

	return Menu;
})();