const { Command } = require('discord.js-commando');

const yt = require('ytdl-core');
var AuthDetails = require('../../auth.json');
var youtube_node = require('youtube-node');
youtube = new youtube_node();
youtube.setKey(AuthDetails.youtube_api_key);
youtube.addParam('type', 'video');

module.exports = class playCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Plays the given video.',
      examples: [';play'],
      args: [{
        key: 'url',
        prompt: 'What is the URL/tags of the video you would like to play?',
        type: 'string'
      }]
    });
  }

  run(msg, args) {
    const { url } = args;

    var final_url = url;

    if(!url.startsWith("http://")){
      youtube.search(url, 1, function(error, result) {
          if (error) {
            msg.say("¯\\_(ツ)_/¯");
          }
          else {
            if (!result || !result.items || result.items.length < 1) {
              msg.say("¯\\_(ツ)_/¯");
            } else {
              final_url = "http://www.youtube.com/watch?v=" + result.items[0].id.videoId;
            }
          }
        });
    }

    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`Please be in a voice channel first!`);
    }
    voiceChannel.join()
      .then(connnection => {
        const stream = yt(final_url, {filter: 'audioonly'});
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => {
          voiceChannel.leave();
        });
      });
  }
};
