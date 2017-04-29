/* Require discord.js */
const Discord = require('discord.js');
const superagent = require('superagent');
const token = require('./token.js');
/* Create a new manager and spawn 2 shards */
const Manager = new Discord.ShardingManager('./discord_bot.js');
Manager.spawn(2);

Manager.on('launch', function(shard){
  setTimeout(function(){
    Manager.fetchClientValues('guilds.size').then(results => {
      servercount = results.reduce((prev, val) => prev + val, 0);
      console.log(servercount + ` total guilds`);

      //send server count to bots.discord.pw
    	superagent
    	.post('https://bots.discord.pw/api/bots/236949446091472896/stats')
    	.send({"server_count": servercount})
    	.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxNzQyOTE1NTg0NDk4MDczNjEiLCJyYW5kIjoyMTYsImlhdCI6MTQ3NjY1MDY2NX0.z3krQHAXxpFdinKEiD5sZWed50U6ZEyz8DWMIhLLUEg')
    	.end(function(err, res){
    		if(err) {console.log('There was a problem sending server count to bots.discord.pw!\n' + err)}
    		if(res) {console.log('server count successfully sent to bots.discord.pw!')}
    	});

    	//send server count to carbonitex.net/discord/bots
    	superagent
    	.post('https://www.carbonitex.net/discord/data/botdata.php')
    	.send({"key": 'jcool018ab543lfcg1510', "servercount": servercount})
    	.end(function(err, res){
    		if(err) {console.log('There was a problem sending server count to carbonitex.net!\n' + err)}
    		if(res) {console.log('server count successfully sent to carbonitex.net!')}
    	});

    	//send server count to jwiggiff.github.io/JARVIS
    	superagent
    	.get('https://api.github.com/repos/jwiggiff/JARVIS/contents/api.json?ref=gh-pages')
    	.auth('jcool.friedman@gmail.com', token.pass)
    	.end(function(err, res){
    	  if(err) {console.log('There was a problem getting server count from jwiggiff.github.io!\n' + err); return}
    	  if(res) {
    	    sha = res.body.sha;
    	    console.log('sha is ' + sha);

    	    var b = new Buffer('{"serverCount": ' + servercount + '}');
    	    var s = b.toString('base64');
    	    superagent
    	    .put('https://api.github.com/repos/jwiggiff/JARVIS/contents/api.json')
    	    .auth('jcool.friedman@gmail.com', token.pass)
    	    .send({
    				"branch": "gh-pages",
    	      "message": 'update serverCount',
    	      "commiter": {
    	        "name": "jwiggiff",
    	        "email": "jcool.friedman@gmail.com"
    	      },
    	      "content": s,
    	      "sha": sha
    	    })
    	    .end(function(err, res){
    	      if(err) {console.log('There was a problem sending server count to jwiggiff.github.io!\n' + err); return}
    	      if(res) {console.log('server count successfully sent to jwiggiff.github.io!')}
    	    });

    	  }
    	});

    }).catch(console.error);
  },60000);
})
