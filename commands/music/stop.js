const { Command } = require('discord.js-commando');

module.exports = class stopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            aliases: [
              'stfu',
              'stahp',
              'disconnect'
            ],
            group: 'music',
            memberName: 'stop',
            description: 'Disconnects JARVIS from voice connection on the server',
            examples: [';stop']
        });
    }

    run(msg, args) {
      if(!msg.guild.voiceConnection){
        return msg.say("I'm not connected to a Voice Channel!");
      }
      msg.guild.voiceConnection.disconnect()
      console.log('Disconnected!');
      return msg.say("Disconnected!");
    }
};
