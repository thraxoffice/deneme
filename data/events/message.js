const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js");
const db = require("quick.db");
let talkedRecently = new Set();
module.exports = async message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, );

  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);

  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  
  if (cmd) {
    
let karaliste = db.fetch(`kliste.${message.author.id}`);
   const karalistedesin = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('Hata!')
    .setDescription('Kara listeye alındığın için botun hiç bir komudunu kullanamazsın !')
    .addField('Kara listeye alınma sebebin', karaliste)
   if(karaliste) return message.channel.send(karalistedesin)
    
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};

