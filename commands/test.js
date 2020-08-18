const Discord = require('discord.js')
const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission, M) => {
  message.channel.fetchMessages().then(messages => {
  messages.array().reverse().forEach(msg => {
    if(msg.author.id === "568539957703213077"){
    msg.delete();
    }
  });
});
}