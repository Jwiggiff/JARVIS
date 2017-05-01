const { Command } = require('discord.js-commando');

module.exports = class announceCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'announce',
      group: 'other',
      memberName: 'announce',
      description: 'bot says message with text to speech',
      examples: [';announce like a boss'],
      args: [{
        key: 'text',
        prompt: 'What do you want JARVIS to announce?',
        type: 'string'
      }]
    });
  }

  run(msg, args) {
    const { text } = args;

    msg.say(text,{tts:true});
  }
};
