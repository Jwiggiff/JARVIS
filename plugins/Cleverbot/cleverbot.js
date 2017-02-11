exports.commands = [
	"talk"
]

var cleverbot = require("cleverbot-node");
var token = require('../../token.js');
talkbot = new cleverbot;
talkbot.configure({botapi: token.cleverKey});


exports.talk = {
	usage : "<message>",
	description : "Talk directly to the bot",
	process : function(bot,msg, suffix) {
			var conv = suffix.split(" ");
			cleverbot.prepare(function(){
				talkbot.write(conv, function (response) {
					console.log(response);
					msg.channel.sendMessage(response.message)
				})
			});
	}
}
