const Discord = require('discord.js')
const fs = require('fs');
const { search } = require('kaori');
const lg = require('../storage/language.json');
const Config = require('../storage/config.json');

module.exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("Desculpe, este canal não é nsfw!");

    var limit = Number(args[args.length - 1]) ? parseInt(args[args.length - 1]) : 1;
    var tags = Number(args[args.length - 1]) ? args.slice(0, -1) : args;
    
    const images = await search('lolibooru', { tags, limit, random: true });
    images.map(image => {
        return message.channel.send({
            "embed": {
                color: 0xffdb00,
                title: 'lolibooru - Score [' + image.score + ']',
                url: image.fileURL,
                "image": {
                    "url": image.fileURL,
                },
                footer: {
                    text: ""
                }
            }
        });
    });
}
module.exports.config = {
    name: "loli",
    aliases: ['loli']
}