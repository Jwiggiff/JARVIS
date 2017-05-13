const { Command } = require('discord.js-commando');

module.exports = class TrollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'troll',
            group: 'fun',
            memberName: 'troll',
            description: 'trolls the mentioned user',
            examples: [';troll \@bob'],
            args: [{
              key: 'user1',
              prompt: 'Which user do you want to troll?',
              type: 'user'
            }]
        });
    }

    run(msg, args) {
      let { user1 } = args;
      let user = msg.guild.member(user1);
      if (!user.voiceChannel) {
        return msg.channel.send('Error: It didn\'t work!\nThe user needs to be connected to a voice channel, Silly Billy! :stuck_out_tongue_winking_eye:');
      }
      if(!user.voiceChannel.joinable) {
        return msg.channel.send('I don\'t have permission to join that Voice Channel!')
      }
      console.log('trolling ' + user)
      //The soundtracks jarvis plays when he trolls you
      var trolls = {
        0 : "./lib/Sounds/Air Horn.mp3",
        1 : "./lib/Sounds/Rick Roll.mp3",
        2 : "./lib/Sounds/Pokemon Go.mp3",
        3 : "./lib/Sounds/Sandstorm.mp3"
      };
      var randomTroll = trolls[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
      var voiceChannel = user.voiceChannel;
      voiceChannel.join()
      .then(connection => {
        console.log('Connected!');
        const dispatcher = connection.playFile(randomTroll);
        dispatcher.on('end', () => {
          voiceChannel.leave();
        });
      })
      .catch(console.log);
      //The Things that jarvis says when he trolls you
      var texts = {
        0 : "Duuuude That was so Kappa!",
        1 : "LOL",
        2 : "Trololololol",
        3 : "Get trolled M8!",
        4 : "You Just Got Trolled!",
        5 : "Reeeeeeeeeemed!"
      }
      var randomText = texts[Math.floor(Math.random() * (5 - 0 + 1) + 0)];
      return msg.channel.send(randomText);
    }
};
