const { Command } = require('discord.js-commando');

module.exports = class stopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Disconnects JARVIS from voice connection on the server',
            examples: [';stop']
        });
    }

    run(msg, args) {
      msg.guild.voiceConnection.disconnect()
      console.log('Disconnected!');
      return msg.say("Disconnected!");
    }
};
