const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;
const moment = require("moment");

let DP = {
        "online": "<:Online:555836354022473772> Online",
        "offline": "<:Desconectado:555836353544454154> Offline",
        "idle": "<:Ausente:555836351136792608> Idle",
        "dnd": "<:Ocupado:555836353787723788> Do Not Disturb",
    }

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  try{
    let Mention = message.mentions.members.first() || message.member;
    let MentionID = Mention.user.id;
    let MentionUsername = Mention.user.username;
    let MentionAvatar = Mention.user.displayAvatarURL;
    let MentionStatus = DP[Mention.presence.status];
    let MentionRegistered = moment.utc(Mention.user.createdAt).format(lg[language].format);
    let MentionEntered = moment.utc(Mention.joinedAt).format(lg[language].format);
    let MentionRoles = Mention.roles.map(r => r.name).join("\`, \`");
    
    if(language === "en"){
      moment.locale();
    }else{
      moment.locale("pt-br");
    }
    
    

    let Userinfo = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(`${MentionUsername} - ID: ${MentionID}`, `${MentionAvatar}`)
    .setThumbnail(MentionAvatar)
    .addField("Status 🗒:", `${MentionStatus}\nㅤ`)
    .addField(lg[language].userinfo_created, `${MentionRegistered}\nㅤ`)
    .addField(lg[language].userinfo_entered, `${MentionEntered}\nㅤ`)
    .addField(lg[language].userinfo_roles, `\`${MentionRoles}\`\nㅤ`)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

    message.channel.send(Userinfo)
  }catch(err){
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
    return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
}