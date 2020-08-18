const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const serverData = require('../storage/serverData.json');
const fs = require('fs');
const lg = require('../storage/language.json');

const DP = {
      "false": "<:Ocupado:555836353787723788>",
      "true": "<:Online:555836354022473772>"
      }

var welcome = false;
var goodbye = false;
var track = false;

exports.run = (client, message, args, language, permission, dt) => {
  let Mention = message.mentions.members.first() || message.member;
  if(message.member.hasPermission('ADMINISTRATOR') || permission)
    {
      const log = serverData[message.guild.id].log;
      
      var ID = args[0];
      var TOF = args[1];
      
      if(serverData[message.guild.id].goodbye != "" && serverData[message.guild.id].goodbye1 != "" && serverData[message.guild.id].goodbye2 != ""){
        goodbye = true;
      }
      if(serverData[message.guild.id].welcome != "" && serverData[message.guild.id].welcome1 != "" && serverData[message.guild.id].welcome2 != ""){
        welcome = true;
      }
      if(serverData[message.guild.id].track != ""){
        track = true;
      }

      if (ID == 1) {
          serverData[message.guild.id].delm = !serverData[message.guild.id].delm;
          fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
            if (err) {
              console.log(err);
               const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].sorry_error)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            }
             const Prefix = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription(lg[language].delete_cmd_message + " " + lg[language].changed_to + " " + `${DP[serverData[message.guild.id].delm]}`)
              .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

              message.channel.send(Prefix)
          })
        }
       else if (ID == 2) {
          serverData[message.guild.id].nsfw = !serverData[message.guild.id].nsfw;
          fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
            if (err) {
              console.log(err);
               const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].sorry_error)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            }
             const Prefix = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription('``Enable or disable nsfw``' + " " + lg[language].changed_to + " " + `${DP[serverData[message.guild.id].nsfw]}`)
              .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

              message.channel.send(Prefix)
          })
        }
      else if (ID == 3) {
          serverData[message.guild.id].eco = !serverData[message.guild.id].eco;
          fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
            if (err) {
              console.log(err);
               const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].sorry_error)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            }
             const Prefix = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription('``Level system and economy commands``' + " " + lg[language].changed_to + " " + `${DP[serverData[message.guild.id].eco]}`)
              .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

              message.channel.send(Prefix)
          })
        }else if (ID == 4) {
          serverData[message.guild.id].links = !serverData[message.guild.id].links;
          fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
            if (err) {
              console.log(err);
               const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].sorry_error)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            }
             const Prefix = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription('``Invites for others servers``' + " " + lg[language].changed_to + " " + `${DP[serverData[message.guild.id].links]}`)
              .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

              message.channel.send(Prefix)
          })
        }else if (ID == 5) {
          serverData[message.guild.id].reactions = !serverData[message.guild.id].reactions;
          fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
            if (err) {
              console.log(err);
               const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].sorry_error)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            }
             const Prefix = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription('``Reactions on images``' + " " + lg[language].changed_to + " " + `${DP[serverData[message.guild.id].reactions]}`)
              .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

              message.channel.send(Prefix)
          })
        }
      else if (ID == 6) {
          serverData[message.guild.id].admin = !serverData[message.guild.id].admin;
          fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
            if (err) {
              console.log(err);
               const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].sorry_error)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            }
             const Prefix = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription('``Administrator commands``' + " " + lg[language].changed_to + " " + `${DP[serverData[message.guild.id].admin]}`)
              .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

              message.channel.send(Prefix)
          })
        }else if (ID == 7) {
          serverData[message.guild.id].music = !serverData[message.guild.id].music;
          fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
            if (err) {
              console.log(err);
               const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].sorry_error)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            }
             const Prefix = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription('``Music``' + " " + lg[language].changed_to + " " + `${DP[serverData[message.guild.id].music]}`)
              .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

              message.channel.send(Prefix)
          })
        }
      else {
      let Prefix = serverData[message.guild.id].prefix;
      let Config = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username + " - " + "Config", client.user.displayAvatarURL)
      .setDescription(`${lg[language].config2_description} \`${Prefix}config < ID >\` <:Ocupado:555836353787723788>off - <:Online:555836354022473772>on.
    ` + "\n" + lg[language].delm_description + "\n" + `ㅤ${lg[language].d_description} ${DP[serverData[message.guild.id].delm]}
    ` + "**2** : NSFW:" + "\n" + `ㅤ${lg[language].n_description} ${DP[serverData[message.guild.id].nsfw]}
    ` + lg[language].lvleco_description + "\n" + `ㅤ${lg[language].l_description} ${DP[serverData[message.guild.id].eco]}` +
    "\n" + lg[language].otinv_description + "\n" + `ㅤ${lg[language].o_description} ${DP[serverData[message.guild.id].links]}` +
    "\n" + lg[language].reaction_description + "\n" + `ㅤ${lg[language].r_description} ${DP[serverData[message.guild.id].reactions]}`+
    "\n" + lg[language].mod_description + "\n" + `ㅤ${lg[language].m_description} ${DP[serverData[message.guild.id].admin]}`+
    "\n" + lg[language].music2_description + "\n" + `ㅤ${lg[language].m2_description} ${DP[serverData[message.guild.id].music]}` +
    "\n" + lg[language].welcome_description  + "\n" + `ㅤ${lg[language].welcome1_description} ${DP[welcome]}` +
    "\n" + lg[language].goodbye_description + "\n" + `ㅤ${lg[language].goodbye1_description} ${DP[goodbye]}` +
    "\n" + lg[language].track_description + "\n" + `ㅤ${lg[language].track1_description} ${DP[track]}`
                     )
      .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
      
      message.channel.send(Config)
      }
  }else{
     let Permission = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription(lg[language].dt_message)     
    return message.channel.send(Permission);
  }
}