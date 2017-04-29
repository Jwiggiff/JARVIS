const path = require('path');
const Commando = require('discord.js-commando');
const token = require('./token.js');
const bot = new Commando.Client({
    owner: '174291558449807361',
    commandPrefix: 'jarvis ',
    disableEveryone: true
});

bot.on('ready', () => {
  //console.log('I\'m doing things...');
  //bot.user.setAvatar('http://i.imgur.com/l2KqI3Y.png?1');
  package = require('./package.json');
  console.log("Starting " + package.name + " " + package.version + "...\nLogged in!");
  console.log("type "+bot.commandPrefix+"help in Discord for a commands list.");
  bot.user.setStatus("online");
  bot.user.setGame("JARVIS | jarvis help");
});

process.on('unhandledRejection', console.error);

bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['music', 'Music Commands'],
        ['polls', 'Poll Commands'],
        ['fun', 'Fun Commands'],
        ['other', 'Other Useful Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

//Login
bot.login(token.token);
