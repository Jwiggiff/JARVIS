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

    if (msg.content.startsWith(prefix + "troll")) {
      let victim1 = msg.mentions.users.first();
      let victim = msg.guild.member(victim1);
      console.log('trolling ' + victim)
      var trolls = {
        0 : "./lib/Sounds/Air Horn.mp3",
        1 : "./lib/Sounds/Rick Roll.mp3",
        2 : "./lib/Sounds/Pokemon Go.mp3",
        3 : "./lib/Sounds/Sandstorm.mp3"
      };
      var randomTroll = trolls[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
      var voiceChannel = victim.voiceChannel;
      voiceChannel.join()
      .then(connection => {
        console.log('Connected!');
        const dispatcher = connection.playFile(randomTroll)
      })
      .catch(console.log);

      var texts = {
        0 : "Duuuude That was so Kappa!",
        1 : "LOL",
        2 : "Trololololol",
        3 : "Get trolled M8!",
        4 : "You Just Got Trolled!",
        5 : "Reeeeeeeeeemed!"
      }
      var randomText = texts[Math.floor(Math.random() * (5 - 0 + 1) + 0)];
      msg.channel.sendMessage(randomText);
    }

    if (msg.content.startsWith(prefix + "stop")) {
      msg.guild.voiceConnection.disconnect()
      console.log('Disconnected!');
    }
});

bot.on('ready', () => {
  console.log('I am ready!');
  bot.user.setStatus("online", "JARVIS | jarvis help");
});

bot.login(request.token);
