const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  const GuildVoiceChannels = message.guild.channels.filter(chn => chn.type === "voice");
  //client.voiceConnections.map(voiceConnection => console.log(voiceConnection));
  var channels = GuildVoiceChannels.map(video2 => ` \*\*[${video2.name}](https://discordapp.com/channels/${message.guild.id}/${video2.id})\*\* `).join(' \n ');
  try{
  const chan = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username , client.user.displayAvatarURL)
    .setThumbnail(client.user.displayAvatarURL)
    .addField(lg[language].how_to_use, lg[language].how_to_use_description)
    .addField(lg[language].channels, channels)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

  return message.channel.send(chan);
  }catch(err){
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
    return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
  //GuildVoiceChannels)
}