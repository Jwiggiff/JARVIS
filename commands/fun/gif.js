const { Command } = require('discord.js-commando');

var qs = require("querystring");

var giphy_config = {
    "api_key": "dc6zaTOxFJmzC",
    "rating": "r",
    "url": "http://api.giphy.com/v1/gifs/random",
    "permission": ["NORMAL"]
};

function get_gif(tags, func) {
        //limit=1 will only return 1 gif
        var params = {
            "api_key": giphy_config.api_key,
            "rating": giphy_config.rating,
            "format": "json",
            "limit": 1
        };
        var query = qs.stringify(params);

        if (tags !== null) {
            query += "&tag=" + tags.join('+')
        }

        //wouldnt see request lib if defined at the top for some reason:\
        var request = require("request");
        //console.log(query)
        request(giphy_config.url + "?" + query, function (error, response, body) {
            //console.log(arguments)
            if (error || response.statusCode !== 200) {
                console.error("giphy: Got error: " + body);
                console.log(error);
                //console.log(response)
            }
            else {
                try{
                    var responseObj = JSON.parse(body)
                    func(responseObj.data.id);
                }
                catch(err){
                    func(undefined);
                }
            }
        }.bind(this));
}

module.exports = class gifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gif',
            group: 'fun',
            memberName: 'gif',
            description: 'returns a random gif matching the tags passed',
            examples: [';gif school bus'],
            args: [{
              key: 'tags',
              prompt: 'What tags would you like to use for the gif?',
              type: 'string'
            }]
        });
    }

    run(msg, args) {
      const { tags } = args;
      var tags1 = tags.split(" ");
      get_gif(tags1, function(id) {
    if (typeof id !== "undefined") {
        return msg.channel.sendMessage( "http://media.giphy.com/media/" + id + "/giphy.gif [Tags: " + (tags ? tags : "Random GIF") + "]");
    }
    else {
        return msg.channel.sendMessage( "Invalid tags, try something different. [Tags: " + (tags ? tags : "Random GIF") + "]");
    }
      });
    }
};
