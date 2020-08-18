const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
console.log("a1");
const serverData = require('../storage/serverData.json');
console.log("a2");
const { search } = require('kaori');
console.log("a3");

const lg = require('../storage/language.json');

exports.run = async (client, message, args, language) => {
    if(serverData[message.guild.id]){ return; }
    if(serverData[message.guild.id].nsfw !== true){ return; }
      
         if (!message.channel.nsfw) return message.channel.send(lg[language].hentai_not_nsfw);
    var score = 0;
    var argsHentai = args.toString().replace(/,/g, " ");
    if (args.toString().includes("score:")) {
        score = args.toString();
        score = score.match(/\d+/)[0];
        argsHentai = argsHentai.replace("score:" + score, "");
    }
    argsHentai = argsHentai.toString().replace(/,/g, " ");
    argsHentai = argsHentai.toString().split(" ");
    argsHentai = argsHentai.filter(e => e !== '');
    if (argsHentai.toString() == "") {
        console.log("2");
        await search('rule34', {
                limit: 1,
                random: true
            }).map(image => {
                return message.channel.send({
                    "embed": {
                        color: 0xffdb00,
                        title: 'rule34 - Score [' + image.score + ']',
                        url: image.fileURL,
                        "image": {
                            "url": image.fileURL,
                        },
                        footer: {
                            text: ""
                        }
                    }
                });
            })

    } else if (argsHentai.length == 1) {
        try {
            var hentaiImg = await search('rule34', {
                    tags: [argsHentai[0].toString()],
                    limit: 1,
                    random: true,
                    score: parseInt(score)
                }).map(image => {
                    return message.channel.send({
                        "embed": {
                            color: 0xffdb00,
                            title: 'rule34 - Score [' + image.score + ']',
                            url: image.fileURL,
                            "image": {
                                "url": image.fileURL,
                            },
                            footer: {
                                text: ""
                            }
                        }
                    });
                })
        } catch (err) {
            const YDHP = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].hentai_not_find)
                .setFooter(lg[language].deleted_soon)

            return message.channel.send(YDHP).then(msg => {
                msg.delete(35000)
            });
        }
    } else if (argsHentai.length == 2) {
        try {
            if (argsHentai[1] > 100)
                return;
            for (var i = 0; i < parseInt(argsHentai[1].toString()); i++) {
                var hentaiImg = await search('rule34', {
                        tags: [argsHentai[0].toString()],
                        limit: 1,
                        random: true,
                        score: parseInt(score)
                    })
                    .map(image => {
                        return message.channel.send({
                            "embed": {
                                color: 0xffdb00,
                                title: 'rule34 - Score [' + image.score + ']',
                                url: image.fileURL,
                                "image": {
                                    "url": image.fileURL,
                                },
                                footer: {
                                    text: ""
                                }
                            }
                        });
                    })
            }
        } catch (err) {
            const YDHP = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].hentai_not_find)
                .setFooter(lg[language].deleted_soon)

            return message.channel.send(YDHP).then(msg => {
                msg.delete(35000)
            });
        }

    } else if (argsHentai.length == 3) {
        if (argsHentai[1] > 100)
            return;
        for (var i = 0; i < parseInt(args[1]); i++) {
            var hentaiImg = await search(args[2], {
                    tags: [args[0]],
                    limit: 1,
                    random: true,
                    score: parseInt(score)
                }).map(image => {
                    return message.channel.send({
                        "embed": {
                            color: 0xffdb00,
                            title: args[2] + ' - Score [' + image.score + ']',
                            url: image.fileURL,
                            "image": {
                                "url": image.fileURL,
                            },
                            footer: {
                                text: ""
                            }
                        }
                    });
                })
        }
    }
}