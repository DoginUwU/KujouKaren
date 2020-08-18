const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;

exports.run = (client, message, args) => {
  message.channel.send(`\*\*[Invite](${Config.IL})\*\*`);
}