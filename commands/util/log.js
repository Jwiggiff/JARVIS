const { Command } = require('discord.js-commando');

module.exports = class logCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'log',
      group: 'util',
      memberName: 'log',
      description: 'logs message to bot console',
      examples: [';log everthing is working!'],
      args: [{
        key: 'text',
        prompt: 'What do you want to log to the console?',
        type: 'string'
      }]
    });
  }

  run(msg, args) {
    const { text } = args;

    console.log(text);
  }
};
