var spotify = require('spotify');
const Discord = require("discord.js");
const Config = require('../config.json'); 
const DC = Config.DC;

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

exports.run = (client, message, args) => {
  spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(data);
});
}