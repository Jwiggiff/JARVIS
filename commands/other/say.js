const { Command } = require('discord.js-commando');

module.exports = class sayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'other',
            memberName: 'say',
            description: 'bot says message that the sender tells it to',
            examples: [';say'],
            args: [{
              key: 'text',
              prompt: 'What do you want JARVIS to say?',
              type: 'string'
            }]
        });
    }

    run(msg, args) {
      const { text } = args;
      return msg.say(text);
    }
};
