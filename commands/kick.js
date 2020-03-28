const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const serverData = require('../storage/serverData.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  if(!message.member.hasPermission('KICK_MEMBERS')){
      const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].not_allowed + "KICK_MEMBERS" + lg[language].not_allowed_2)
          .setFooter(lg[language].deleted_soon)
  
      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }else{
    const user = message.mentions.users.first();
    const banReason = args.slice(1).join(' ');
    if(serverData[message.guild.id].admin){
      if (!user) {
         const YDHP = new Discord.RichEmbed()
                  .setColor('#ff0000')
                  .setAuthor(client.user.username, client.user.displayAvatarURL)
                  .setDescription(lg[language].kick_unable_kick)
                  .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }else{
        const member = message.guild.member(user);
        if (member) {
           /*const YDHP = new Discord.RichEmbed()
                  .setColor('#ff0000')
                  .setAuthor(client.user.username, client.user.displayAvatarURL)
                  .setDescription("Sorry, you are banned of the server: " + `${message.guild.name}`)

                user.send(YDHP)*/
           member.kick(banReason).then(() => {
                    const YDHP = new Discord.RichEmbed()
                  .setColor(DC)
                  .setAuthor(client.user.username, client.user.displayAvatarURL)
                  .setDescription(lg[language].kick_kicked + "``" + `${banReason}` + '``')

                return message.channel.send(YDHP);
            }).catch(err => {
               const YDHP = new Discord.RichEmbed()
                  .setColor('#ff0000')
                  .setAuthor(client.user.username, client.user.displayAvatarURL)
                  .setDescription(lg[language].kick_unable_kick)
                  .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            });
        }else{
          const YDHP = new Discord.RichEmbed()
                  .setColor('#ff0000')
                  .setAuthor(client.user.username, client.user.displayAvatarURL)
                  .setDescription(lg[language].kick_unable_kick)
                  .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});  
        }
      }
    }else{
      const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].adm_cmds_disabled)
          .setFooter(lg[language].deleted_soon)
  
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }
  }
}