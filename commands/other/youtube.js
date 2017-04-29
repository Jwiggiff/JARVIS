const { Command } = require('discord.js-commando');

var AuthDetails = require('../../auth.json');
var youtube_node = require('youtube-node');
youtube = new youtube_node();
youtube.setKey(AuthDetails.youtube_api_key);
youtube.addParam('type', 'video');

module.exports = class youtubeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'youtube',
      group: 'other',
      memberName: 'youtube',
      description: 'gets youtube video matching the tags stated by the user',
      examples: [';youtube'],
      args: [{
        key: 'tags',
        prompt: 'What tags would you like to search for?',
        type: 'string'
      }]
    });
  }

  run(msg, args) {
    const { tags } = args;
    youtube.search(tags, 1, function(error, result) {
        if (error) {
          msg.say("¯\\_(ツ)_/¯");
        }
        else {
          if (!result || !result.items || result.items.length < 1) {
            msg.say("¯\\_(ツ)_/¯");
          } else {
            msg.say("http://www.youtube.com/watch?v=" + result.items[0].id.videoId );
          }
        }
      });
  }
};
