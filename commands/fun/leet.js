const { Command } = require('discord.js-commando');

const leet = require("leet");

module.exports = class leetCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leet',
      group: 'fun',
      memberName: 'leet',
      description: 'converts boring regular text to 1337',
      examples: [';leet jarvis'],
      args: [{
        key: 'text',
        prompt: 'What text would you like to convert to 1337?',
        type: 'string'
      }]
    });
  }

  run(msg, args) {
    const { text } = args;

    return msg.say( leet.convert(text));
  }
};
