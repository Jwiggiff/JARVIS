var Discord = require("discord.js");
var bot = new Discord.Client();
var request = require("./token.js");

bot.on('warn', (m) => console.log('[warn]', m));
bot.on('debug', (m) => console.log('[debug]', m));

var commands = "help          Displays All Available Commands\nping          Pong!\ntroll         Trolls the @mentioned User!\nstop          Disconnects JARVIS from all voice connections"

bot.on("message", msg => {

  let prefix = "jarvis ";

  if(!msg.content.startsWith(prefix)) return;
  if(msg.author.bot) return;
  var User = msg.author
    if (msg.content.startsWith(prefix + "help")) {
        msg.channel.sendMessage("I sent a list of commands to you, " + User + "!");
        var helpMessage = '**These are the available commands for JARVIS(all Commands must start with "jarvis "):**\n\n`' + commands + '`\n\nThank You For Using JARVIS.\nBy Jcool.Friedman'
        User.sendFile('./lib/Images/jarvis icon1.png', '', helpMessage);
    }

    if (msg.content.startsWith(prefix + "ping")) {
      msg.channel.sendMessage("Pong!");
    }

  if (msg.content.startsWith(prefix + "(╯°□°）╯︵ ┻━┻")) {
    msg.channel.sendMessage("┬─┬﻿ ノ( ゜-゜ノ)");
  }
});

bot.on('ready', () => {
  console.log('I am ready!');
  bot.user.setStatus("online", "JARVIS | jarvis help");
});

bot.login(request.token);
