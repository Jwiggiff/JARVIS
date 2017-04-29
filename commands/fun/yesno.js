const { Command } = require('discord.js-commando');
const superagent = require('superagent');

module.exports = class yesnoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'yesno',
      group: 'fun',
      memberName: 'yesno',
      description: 'the bot responds yes or no.',
      examples: [';<usage>']
    });
  }

  run(msg, args) {
    superagent
    .get('https://yesno.wtf/api')
    .end(function(err, res){
      if (err) {console.log(err)};
      if (res) {msg.say(res.body.image)};
    });
  }
};
