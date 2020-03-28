const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { Client, Util } = require('discord.js');
const Discord = require('discord.js');
const Config = require('../config.json');
const DC = Config.DC;
const serverData = require('../storage/serverData.json');

const youtube = new YouTube('AIzaSyDoOAI2QnxoV669I3zo82JE5H08qbvJhFk');
const queue = new Map();

var voiceC = null;

const lg = require('../storage/language.json');

var looping = false;

const DP = {
      "false": "<:Ocupado:555836353787723788>",
      "true": "<:Online:555836354022473772>"
      }

exports.run = (client, message, args, language) => {
  if (!message.guild) return;
  console.log(message.member.voiceChannel);
  
  if(serverData[message.guild.id].music == false){ message.channel.stopTyping(); return;}

  const serverQueue = queue.get(message.guild.id);
  const searchString = args.slice(1).join(' ');
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  
  if(args[0].toLowerCase() == "play"){  
    if(voiceC == null){
      voiceC = message.member.voiceChannel;
      Play();
    }else{
      Play();
    }
  }
  
    if(args[0].toLowerCase() == "skip"){
      if (!message.member.voiceChannel){ 
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_voicechannel)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
      if (!serverQueue){ 
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_playing)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)}); 

      }
      serverQueue.connection.dispatcher.end('Skip command has been used!');
      return undefined;
    }
  if(args[0].toLowerCase() == "stop"){
      if (!message.member.voiceChannel){ 
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_voicechannel)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
      if (!serverQueue){ 
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_voicechannel)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)}); 

      }
      serverQueue.songs = [];
		  serverQueue.connection.dispatcher.end('Stop command has been used!');
      return undefined;
    }
  
  if(args[0].toLowerCase() == "pause"){
    if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			const description = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setThumbnail(`${serverQueue.songs[0].thumb}`)
        .setDescription(`${lg[language].music_paused} **${serverQueue.songs[0].title}**`)
        .setURL(serverQueue.songs[0].url)
        .setFooter(`Duration: ${serverQueue.songs[0].hours}:${serverQueue.songs[0].minutes}:${serverQueue.songs[0].seconds}`)
     return serverQueue.textChannel.send(description);
		}
		const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_playing)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)}); 
  }
  
  if(args[0].toLowerCase() == "resume"){
    if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			const description = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setThumbnail(`${serverQueue.songs[0].thumb}`)
        .setDescription(`${lg[language].music_resumed} **${serverQueue.songs[0].title}**`)
        .setURL(serverQueue.songs[0].url)
        .setFooter(`Duration: ${serverQueue.songs[0].hours}:${serverQueue.songs[0].minutes}:${serverQueue.songs[0].seconds}`)
     return serverQueue.textChannel.send(description);
		}
		const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_playing)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)}); 
  }
  
  if(args[0].toLowerCase() == "loop"){
    if (serverQueue && serverQueue.playing) {
      looping = !looping;
			const loop = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(lg[language].music_loop + ' ' + `${DP[looping]}` + '')
     return serverQueue.textChannel.send(loop);
		}
		const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_playing)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)}); 
  }
  
  
  if(args[0].toLowerCase() == "queue"){
    if (!serverQueue) {
			const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_playing)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)}); 
		}
		const queue = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setThumbnail(`${serverQueue.songs[0].thumb}`)
      .setDescription(`${lg[language].music_playing} **${serverQueue.songs[0].title}**`)
      .addField(lg[language].music_queue, `${serverQueue.songs.map(song => ` ${song.title}`).join('\n')}`)
    return serverQueue.textChannel.send(queue);
  }
  
  if(args[0].toLowerCase() == "volume"){
      if (!message.member.voiceChannel){ 
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_voicechannel)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
      if (!serverQueue){ 
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_not_voicechannel)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)}); 

      }
      serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      const description = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(`${lg[language].music_volume} **${args[1]}**`)
    return serverQueue.textChannel.send(description);
    }
  
  async function Play(){
    var voiceChannel = null;
    if(voiceC == null){
     voiceChannel = message.member.voiceChannel;
    }else{
      voiceChannel = voiceC;
    }
    
        if (!voiceChannel) {
         const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].music_could_join)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
         const YDHP = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(lg[language].music_perm)
        .setFooter(lg[language].deleted_soon)
      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
    
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/) || url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/list(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); 
				await handleVideo(video2, message, voiceChannel, true); 
			}
			return message.channel.send(`**${playlist.title}**`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
          const YDHP = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`
          __**${lg[language].music_selection}**__
          ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
          \n ${lg[language].music_selection2}
					`)
        .setFooter(lg[language].deleted_soon)
       message.channel.send(YDHP).then(msg => {msg.delete(350000)});
        
				try {
						var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 25000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return;
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
          
				} catch (err) {
					console.error(err);
					const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].music_no_results)
            .setFooter(lg[language].deleted_soon)
          return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
  }
  
  
  
  async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`,
    thumb: video.thumbnails.medium.url,
    "hours": video.duration.hours,
    "minutes": video.duration.minutes,
    "seconds": video.duration.seconds
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
       const YDHP = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(lg[language].music_could_join)
        .setFooter(lg[language].deleted_soon)
      return msg.channel.send(YDHP).then(msg => {msg.delete(35000)});
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else {
       const description = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setThumbnail(`${song.thumb}`)
      .setDescription(`${lg[language].music_add_queue} **[${song.title}](${song.url})**`)
      .setFooter(`Duration: ${song.hours}:${song.minutes}:${song.seconds}`)
    serverQueue.textChannel.send(description);
    }
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') {
          if(looping){
            play(guild, serverQueue.songs[0]);
          }else{
             const YDHP = new Discord.RichEmbed()
              .setColor('#ff0000')
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription(lg[language].music_end)
              .setFooter(lg[language].deleted_soon)
            message.channel.send(YDHP).then(msg => {msg.delete(35000)});
          }
      }
			else console.log(reason);
      if(!looping){
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      }
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    const description = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setThumbnail(`${song.thumb}`)
      .setDescription(`${lg[language].music_start} **[${song.title}](${song.url})**`)
      .setFooter(`Duration: ${song.hours}:${song.minutes}:${song.seconds}`)
    serverQueue.textChannel.send(description);
  }
}