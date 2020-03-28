const Discord = require("discord.js");
const Config = require('../config.json'); 
const DC = Config.DC;
const SteamAPI = require('steamapi');
const steam = new SteamAPI(process.env.steam);

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  try{
    steam.resolve('https://steamcommunity.com/id/' + `${args}`).then(id => {
         steam.getUserLevel(id).then(level => {
            steam.getUserSummary(id).then(summary => {
              steam.getUserBans(id).then(ban => {
                steam.getUserRecentGames(id).then(games => {
                  steam.getUserBadges(id).then(badges => {
                    //steam.getUserOwnedGames(id).then(ownedGames => {
                     var date = new Date(summary.created*1000);
                     var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                     var year = date.getFullYear();
                     var month = months_arr[date.getMonth()];
                     var day = date.getDate();
                     var hours = date.getHours();
                     var minutes = "0" + date.getMinutes();
                     var convdataTime = day+'/'+month+'/'+year+' '+hours + ':' + minutes.substr(-2);

                     var dateOff = new Date(summary.lastLogOff*1000);
                     var yearOff = dateOff.getFullYear();
                     var monthOff = months_arr[dateOff.getMonth()];
                     var dayOff = dateOff.getDate();
                     var hoursOff = dateOff.getHours();
                     var minutesOff = "0" + date.getMinutes();
                     var convdataTimeOff = dayOff+'/'+monthOff+'/'+yearOff+' '+hoursOff + ':' + minutesOff.substr(-2);
                      var games_ = "none";
                      for(var i = 0; i < games.lenght; i++){
                        games_ += games[i].name + "\n";
                      }
                      let embed = new Discord.RichEmbed()
                        .setColor(DC)
                        .setThumbnail(summary.avatar.medium)
                        .setAuthor(client.user.username, client.user.displayAvatarURL)
                        .setURL(summary.url)
                        .addField("Nick:", `${summary.nickname}`, true)
                        .addField("Real Name:", `${summary.realName}`, true)  
                        .addField("Level: ",`${level}`, true)
                        .addField("SteamID: ", `${summary.steamID}`, true)
                        .addField("Player XP: ",`${badges.playerXP}`, true)
                        .addField("Games Ban: ", `${ban.gameBans}`, true)
                        .addField("Vac Ban: ", `${ban.vacBans}`, true)
                        //.addField("Games: ", `${ownedGames.length}`+ '```', true)
                        .addField("Last game played: ", `${games_}` )
                        .addField("Created on: ", `${convdataTime}`, true)
                        .addField("Last time offline: ", `${convdataTimeOff}`, true)
                        .setFooter(`Command requested by: ${message.author.tag}`, `${message.author.avatarURL}`)
                      message.channel.send(embed);
                  //});
                });
              });
            });
          });
        });
      });
  }catch(err){
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
    return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
}