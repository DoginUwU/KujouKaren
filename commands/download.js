const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const lg = require('../storage/language.json');
var horriblesubs = require("horriblesubs")
var TinyURL = require('tinyurl');
var HS = new horriblesubs();


exports.run = (client, message, args, language) => {
   const YDHP = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription("Wait...")
    .setFooter(lg[language].deleted_soon)
  message.channel.send(YDHP).then(msg => {
    HS.getMagnets(args.toString().replace(/,/g, " "), ['720']).then(function(links){
      //links.map(function(item){ message.channel.send(item) });
      var maxEp = links.length;
      const YDHP2 = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription("Enter episode number 1 to " + maxEp)
      .setFooter(lg[language].deleted_soon)
      msg.edit(YDHP2).then(async msg => {
        try {
						var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 25000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return;
					}
					const number = parseInt(response.first().content);
          console.log(links[number - 1].magnet);
          TinyURL.shorten(links[number - 1].magnet, function(res, err) {
              if (err)
                  console.log(err)
            let BotInfo = new Discord.RichEmbed()
              .setColor(DC)
              .setThumbnail(client.user.displayAvatarURL)
              .setAuthor(client.user.username + " - " + `ID: ${client.user.id}`, client.user.displayAvatarURL)
              .setDescription(`**[Click here to download the episode in 720P](${res})**`)
              .setFooter("Powered by horriblesubs")
            msg.edit(BotInfo);
          });
         
      });
      //
    }).catch(function(err){
       const YDHP2 = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription("No results :C")
      .setFooter(lg[language].deleted_soon)
      msg.edit(YDHP2)
    });
  });
  
}