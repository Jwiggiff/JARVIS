const { Command } = require('discord.js-commando');

module.exports = class rollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'other',
      memberName: 'roll',
      description: 'roll one die with x amount ofsides, or multiple dice using d20 syntax. Default value is 10',
      examples: [';roll 6'],
      args: [{
        key: 'num',
        prompt: 'How many sides on the die?',
        type: 'int'
      }]
    });
  }

  run(msg, args) {
    const { num } = args;

    var result = Math.floor((Math.random() * num));

    return msg.say(msg.author + " rolled a " + result);
  }
};
