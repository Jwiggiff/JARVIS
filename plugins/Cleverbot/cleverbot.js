exports.commands = [
	"talk"
]

var Cleverbot = require("cleverbot");
var token = require('../../token.js');

let talkbot = new Cleverbot({
  key: token.cleverKey
});


exports.talk = {
	usage : "<message>",
	description : "Talk directly to the bot",
	process : function(bot,msg, suffix) {
			var conv = suffix.split(" ");
			talkbot.query(conv)
			.then(function (response) {
				console.log(response);
				msg.channel.sendMessage(response.output);
			});
	}
}
