
module.exports = (function() {
	var config = require("../config");

	var messages = [
		'You Died! Sorry about that.',
		'Today is a good day to die.',
		'You blood freezes, your skin blackens, you drown.',
		'The cold water embraces you like a spurned lover.',
		'One by one the bright birds leave you.',
		'The loneliness grows and slowly fills your frozen body.',
		'The king stands in his tower. You sleep in his moat.',
		'You lasted as long as you could.',
		'Perhaps swimming is not for you.',
		'Life. Don\'t talk to me about life.',
		'You just didn\'t want it enough.',
		'Who wants to sleep with the fishes?',
		'Ugh, I hate that fish!',
		'Wow! Super-Fish!'
	];

	var GameOver = function() {};

	GameOver.prototype = {
		preload: function () {},
		create: function () {
			var style = { font: '16px Arial', fill: '#ffffff', align: 'center'};

			this.game.stage.background = this.game.stage.background = this.game.add.image(0, 0, 'sea');

			this.titleText = this.game.add.text(this.game.world.centerX, 200, 'Game Over!', config.MENU_HEADING);
			this.titleText.anchor.setTo(0.5, 0.5);

			this.congratsText = this.game.add.text(this.game.world.centerX, 300, this.rnd.pick(messages), style);
			this.congratsText.anchor.setTo(0.5, 0.5);

			this.instructionText = this.game.add.text(this.game.world.centerX, 400, 'Click To Play Again', style);
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