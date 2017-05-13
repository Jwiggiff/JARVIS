const { Command } = require('discord.js-commando');

module.exports = class twitchCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'twitch',
      group: 'search',
      memberName: 'twitch',
      description: 'checks if the given stream is online',
      examples: [';twitch <url>'],
      args: [{
        key: 'text',
        prompt: 'What stream would you like to check?',
        type: 'string'
      }]
    });
  }

  run(msg, args) {
    const { text } = args;

    require("request")("https://api.twitch.tv/kraken/streams/"+text,
    function(err,res,body){
      var stream = JSON.parse(body);
      if(stream.stream){
        msg.channel.send( suffix
          +" is online, playing "
          +stream.stream.game
          +"\n"+stream.stream.channel.status
          +"\n"+stream.stream.preview.large)
      }else{
        msg.channel.send( text+" is offline")
      }
    });
  }
};
