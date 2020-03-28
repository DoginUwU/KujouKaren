const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const serverData = require('../storage/serverData.json');
const { readdirSync } = require('fs')
const pack = require('../package.json')

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  let Prefix = serverData[message.guild.id].prefix;
  
  const Adm = {
          "false": ",",
          "true": `, Moderation,`,
          }
  const Eco = {
          "false": "",
          "true": `Economy,`,
          }
  const MS = {
          "false": ",",
          "true": `, Music,`,
          }
  const NW = {
          "false": "",
          "true": `, NSFW`,
          }
  
  const Administrator = Adm[serverData[message.guild.id].admin]
  const Economy = Eco[serverData[message.guild.id].eco]
  const Music = MS[serverData[message.guild.id].music]
  const NSFW = NW[serverData[message.guild.id].nsfw]
  
  if(args.join(" ").toLowerCase() == "moderation" && serverData[message.guild.id].admin == true || args.join(" ").toLowerCase() == "moderação" && serverData[message.guild.id].admin == true) {
    let Admin = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username + " - " + "Moderation 🗃", client.user.displayAvatarURL)
    .setDescription(lg[language].adm_description)
    .addField(lg[language].commands + " " + "✨",
             `${Prefix}set_prefix : ${lg[language].prefix_description}` + "\n" + `${Prefix}ban : ${lg[language].ban_description}` + "\n" + `${Prefix}kick : ${lg[language].kick_description}` + "\n" + `${Prefix}clear : ${lg[language].clear_description}` + "\n" + `${Prefix}welcome : ${lg[language].welcome1_description}` + "\n" + `${Prefix}goodbye : ${lg[language].goodbye1_description}`)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    
    message.channel.send(Admin);
  }
  else if(args.join(" ").toLowerCase() == "core") {
    let Core = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username + " - " + "Core ⚙️", client.user.displayAvatarURL)
    .setDescription(lg[language].core_description)
    .addField(lg[language].commands + " " + "✨",
             `${Prefix}config : ${lg[language].config_description}`)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    
    message.channel.send(Core);
  }
  else if(args.join(" ").toLowerCase() == "music" && serverData[message.guild.id].music == true || args.join(" ").toLowerCase() == "musica" && serverData[message.guild.id].music == true) {
    let Music = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username + " - " + "Music 🎶", client.user.displayAvatarURL)
    .setDescription(lg[language].music_description)
    .addField(lg[language].commands + " " + "✨",
             `${Prefix}m play : ${lg[language].play_description}` + "\n" + `${Prefix}m skip : ${lg[language].skip_description}` + "\n" + `${Prefix}m loop : ${lg[language].loop_description}` + "\n" + `${Prefix}m volume : ${lg[language].volume_description}` + "\n" + `${Prefix}m queue : ${lg[language].queue_description}` + "\n" + `${Prefix}m pause : ${lg[language].pause_description}` + "\n" + `${Prefix}m resume : ${lg[language].resume_description}` + "\n" + `${Prefix}m stop : ${lg[language].stop_description}`)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    
    message.channel.send(Music);
  }
  else if(args.join(" ").toLowerCase() == "util" || args.join(" ").toLowerCase() == "útil") {
       page1_util(null, null);
    
    //Pagina 1
    async function page1_util(msg, Util){
      if(msg == null){
         let Util = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username + " - " + "Util 🛠", client.user.displayAvatarURL)
        .setDescription(lg[language].util_description)
        .addField(lg[language].commands + " " + "✨",
                  `${Prefix}help : ${lg[language].help_description}` + "\n" + `${Prefix}8ball : ${lg[language].ball_description}` + "\n" + `${Prefix}avatar : ${lg[language].avatar_description}` + "\n" + `${Prefix}math : ${lg[language].math_description}` + "\n" + `${Prefix}metar : ${lg[language].metar_description}` + "\n" + `${Prefix}morse : ${lg[language].morse_description}` + "\n" + `${Prefix}osu : ${lg[language].osu_description}` + "\n" + `${Prefix}ping : ${lg[language].ping_description}` + "\n" + `${Prefix}say : ${lg[language].say_description}` + "\n" + `${Prefix}serverinfo : ${lg[language].serverinfo_description}` + "\n")
        .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

        message.channel.send(Util).then(msg => {
          page2_util(msg, Util);
          })
      }else{
          
      }
    }
    //Pagina 2
    async function page2_util(msg, Util){
      msg.react('▶');

          const filter = (reaction, user) => {
              return ['▶'].includes(reaction.emoji.name) && user.id === message.author.id;
          };

          msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
              .then(collected => {
                  const reaction = collected.first();

                  if (reaction.emoji.name === '▶') {
                      msg.edit(
                    Util = new Discord.RichEmbed()
                      .setColor(DC)
                      .setAuthor(client.user.username + " - " + "Util 🛠", client.user.displayAvatarURL)
                      .setDescription(lg[language].util_description)
                      .addField(lg[language].commands + " " + "✨",
                                   `${Prefix}botinfo : ${lg[language].botinfo_description}` + "\n" + `${Prefix}binary : ${lg[language].binary_description}` + "\n" + `${Prefix}qrcode : ${lg[language].qrcode_description}` + "\n" + `${Prefix}userinfo : ${lg[language].userinfo_description}` + "\n" + `${Prefix}ship : ${lg[language].ship_description}` + "\n" + `${Prefix}spotify : ${lg[language].spotify_description}` + "\n" + `${Prefix}steam : ${lg[language].steam_description}` + "\n" + `${Prefix}translate : ${lg[language].translate_description}` + "\n" + `${Prefix}weather : ${lg[language].weather_description}` + "\n" + `${Prefix}videochat : ${lg[language].videochat_description}`)
                      .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`))
                  }
              })
       .catch(collected => { });
    }
  } 
  if(args.join(" ").toLowerCase() == "economy" && serverData[message.guild.id].eco == true) {
    let Leveling = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username + " - " + "Economy 💵", client.user.displayAvatarURL)
    .setDescription(lg[language].leveling_description)
    .addField(lg[language].commands + " " + "✨",
             `${Prefix}profile : ${lg[language].profile_description}` + "\n" + `${Prefix}backgrounds : ${lg[language].background_description}` + "\n" + `${Prefix}set_background <background> : ${lg[language].setbackground_description}` + "\n" + `${Prefix}set_birthday : ${lg[language].setbirthday_description}` + "\n" + `${Prefix}set_description : ${lg[language].setdescription_description}` + "\n" + `${Prefix}set_gender : ${lg[language].setgender_description}` + "\n" + `${Prefix}set_married : ${lg[language].setmarried_description}` + "\n" + `${Prefix}divorce : ${lg[language].divorce_description}` + "\n" + `${Prefix}house : ${lg[language].house_description}` + "\n" + `${Prefix}rank : ${lg[language].rank_description}`)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    
    message.channel.send(Leveling);
  }
  else if(args.join(" ").toLowerCase() == "anime") {
    let Anime = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username + " - " + "Anime 📘", client.user.displayAvatarURL)
    .setDescription(lg[language].anime_description)
    .addField(lg[language].commands + " " + "✨",
             `${Prefix}anime : ${lg[language].anime_description}`)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    
    message.channel.send(Anime);
  }
  else if (args.join(" ").toLowerCase() == "nsfw" && serverData[message.guild.id].nsfw == true) {
    let NSFW = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username + " - " + "NSFW 🔞", client.user.displayAvatarURL)
    .setDescription(lg[language].nsfw_description)
    .addField(lg[language].commands + " " + "✨",
              `${Prefix}hentai <tag> <amount> <site> : ${lg[language].hentai_description}` + "\n\n" + 
              `${Prefix}hentai <tag> <amount> : ${lg[language].hentai_description}` + "\n\n" + 
              `${Prefix}hentai <tag> : ${lg[language].hentai_description}`+ "\n\n" + 
              `${Prefix}hentai : ${lg[language].hentai_description}`
             )
    .setFooter(`Suported sites: booru / danbooru / konachan / yandere / gelbooru / rule34 / safebooru / tbib / xbooru / youhateus / lolibooru`)
    
    message.channel.send(NSFW);
  }
  else if (args.join(" ").toLowerCase() == "roleplay") {
    let RP = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username + " - " + "Roleplay", client.user.displayAvatarURL)
    .setDescription(lg[language].roleplay_description) 
    .addField(lg[language].commands + " " + "✨",
             `${Prefix}hit : ${lg[language].hit_description}` + "\n" + `${Prefix}sad : ${lg[language].sad_description}` + "\n" + `${Prefix}hug : ${lg[language].hug_description}`)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    
    message.channel.send(RP);
  }
  else if(args == ""){
    try{
      const cmdfile = readdirSync('./commands/')    
      const cmds = cmdfile.length - 8;
      const Help = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].hello_iam + " " + `\*\*${client.user.username}\*\*` + "." + " " + lg[language].im_currently + " " + `\*\*${client.guilds.size}\*\*` + " " + lg[language].servers + " " + lg[language].total_of + " " + `\*\*${client.users.size}\*\*` + " " + lg[language].users_2 + " " + lg[language].exactly + " " + `\*\*${cmds}\*\*` + " " + lg[language].commands_2 + "\n\n" + lg[language].all_commands + " " + "`" + `${Prefix}help <${lg[language].pack}>` + "`.")
      .addField(lg[language].package + " " + "✨", `` + `Core${Administrator} Util${Music} ${Economy} Roleplay, Anime${NSFW}`)
      .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
      
      return message.channel.send(Help);
    }catch(err){
      const SEO = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(SEO).then(msg => {msg.delete(35000)});
    }
  }
}