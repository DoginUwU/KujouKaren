const Discord = require('discord.js')
let serverData = require('../storage/serverData.json');
const Config = require('../config.json')
const DC = Config.DC;
const pack = require('../package.json')
const { readdirSync } = require('fs')

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  
  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  
  const Uptime = `\*\*${days}\*\* ${lg[language].days} - \*\*${hours}\*\* ${lg[language].hours} - \*\*${minutes}\*\* ${lg[language].minutes} - \*\*${seconds}\*\* ${lg[language].seconds}`
  
  const cmdfile = readdirSync('./commands/')    
  const cmds = cmdfile.length - 8;
  
  let BotInfo = new Discord.RichEmbed()
  .setColor(DC)
  .setThumbnail(client.user.displayAvatarURL)
  .setAuthor(client.user.username + " - " + `ID: ${client.user.id}`, client.user.displayAvatarURL)
  .addField(lg[language].username, client.user.username, true)
  .addField(lg[language].prefix, serverData[message.guild.id].prefix, true)
  .addField(lg[language].uptime, Uptime, false)
  .addField(lg[language].servers_2, client.guilds.size, true)
  .addField(lg[language].users_3, client.users.size, true)
  .addField(lg[language].commands_, cmds, true)
  .addField("Ping: ⚡️", `${lg[language].latency2}`, true)
  .addField(lg[language].created_by, `<@${process.env.CLIENT_OWNER_1}>, <@${process.env.CLIENT_OWNER_2}>`, false)
  .addField(lg[language].library, `<:discordicon:577291169067696128> \*\*[Discord.js ${pack.dependencies["discord.js"]}](https://discord.js.org)\*\* \n <:weathericon:577293163975409694> \*\*[Weather-js ${pack.dependencies["weather-js"]}](https://www.npmjs.com)\*\* \n <:icons8playbutton96:577293769724919818> \*\*[Youtube-api ${pack.dependencies["simple-youtube-api"]}](https://www.youtube.com)\*\* `, false)
  .addField("Links: 🔗", `**[Website](https://kujou-karen.glitch.me)** | **[Add to your server](https://discordapp.com/oauth2/authorize?=&client_id=568539957703213077&scope=bot&permissions=8)** | **[Join on server](https://discord.gg/KdZg5qE)**`, false)
  .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
  
  
  return message.channel.send(BotInfo)
}