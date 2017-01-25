exports.commands = [
	"talk"
]

var cleverbot = require("cleverbot-node");
talkbot = new cleverbot;


exports.talk = {
	usage : "<message>",
	description : "Talk directly to the bot",
	process : function(bot,msg, suffix) {
			var conv = suffix.split(" ");
			cleverbot.prepare(function(){
				talkbot.write("", function (response) {
					console.log(response);
					msg.channel.sendMessage(response.message)
				})
			});
	}
}
