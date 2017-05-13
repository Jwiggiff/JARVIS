const { Command } = require('discord.js-commando');

module.exports = class useridCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'userid',
      group: 'util',
      memberName: 'userid',
      description: 'Returns the unique id of a user. This is useful for permissions.',
      examples: [';userid @jcool.friedman#9208'],
      args: [{
        key: 'user',
        prompt: 'Which user do you want to troll?',
        type: 'user'
      }]
    });
  }

  run(msg, args) {
    const { user } = args;

    msg.channel.send( "The id of " + user.username + " is " + user.id);
  }
};
