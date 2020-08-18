const Discord = require("discord.js");
const Config = require("../config.json");
const DC = Config.DC;

let DPL = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
let DPR = {
  brazil: ":flag_br: Brazil",
  "eu-central": ":flag_eu: Central Europe",
  singapore: ":flag_sg: Singapore",
  "us-central": ":flag_us: U.S. Central",
  sydney: ":flag_au: Sydney",
  "us-east": ":flag_us: U.S. East",
  "us-south": ":flag_us: U.S. South",
  "us-west": ":flag_us: U.S. West",
  "eu-west": ":flag_eu: Western Europe",
  "vip-us-east": ":flag_us: VIP U.S. East",
  london: ":flag_gb: London",
  amsterdam: ":flag_nl: Amsterdam",
  hongkong: ":flag_hk: Hong Kong",
  russia: ":flag_ru: Russia",
  southafrica: ":flag_za: South Africa"
};

let DP = {
  online: "<:Online:555836354022473772> Online",
  offline: "<:Desconectado:555836353544454154> Offline",
  idle: "<:Ausente:555836351136792608> Idle",
  dnd: "<:Ocupado:555836353787723788> Do Not Disturb"
};

const lg = require("../storage/language.json");

exports.run = (client, message, args, language) => {
  var Online = message.guild.members.filter(
    member => member.presence.status === "online"
  ).size;
  var Ausente = message.guild.members.filter(
    member => member.presence.status === "idle"
  ).size;
  var Ocupado = message.guild.members.filter(
    member => member.presence.status === "dnd"
  ).size;
  var Desconectado = message.guild.members.filter(
    member => member.presence.status === "offline"
  ).size;

  let GuildName = message.guild.name;
  let GuildOwnerID = message.guild.ownerID;
  let GuildID = message.guild.id;
  let GuildRegion = message.guild.region;
  let GuildIcon = message.guild.iconURL;
  let GuildMembersCount = message.guild.members.filter(
    member => !member.user.bot
  ).size;
  let GuildBotsCount =
    parseInt(message.guild.memberCount) -
    parseInt(message.guild.members.filter(member => !member.user.bot).size);
  let GuildVoiceChannelsCount = message.guild.channels.filter(
    chn => chn.type === "voice"
  ).size;
  let GuildTextChannelsCount = message.guild.channels.filter(
    chn => chn.type === "text"
  ).size;

  let ServerInfo = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(`${GuildName} - ID: ${GuildID}`, `${GuildIcon}`)
    .setThumbnail(GuildIcon)
    .addField(lg[language].owner, `<@${GuildOwnerID}>\nㅤ`)
    .addField(
      lg[language].users,
      `:bust_in_silhouette: Members: ${GuildMembersCount}\n<:Bot:555819698319523851> Bots: ${GuildBotsCount}\nㅤ`,
      true
    )
    .addField(
      lg[language].channels,
      `🔊 Voice channels: ${GuildVoiceChannelsCount}\n💬 Text Channels: ${GuildTextChannelsCount}\nㅤ`,
      true
    )
    .addField(lg[language].region, `${DPR[message.guild.region]}\nㅤ`)
    .addField(
      "Status 🗒:",
      `<:Online:555836354022473772> Online: ${Online}\n<:Ausente:555836351136792608> Idle: ${Ausente}\n<:Ocupado:555836353787723788> Do Not Disturb: ${Ocupado}\n<:Desconectado:555836353544454154> Offline: ${Desconectado}`
    )
    .setFooter(
      `${lg[language].resquest_command} ${message.author.tag}`,
      `${message.author.avatarURL}`
    );

  message.channel.send(ServerInfo);
};
