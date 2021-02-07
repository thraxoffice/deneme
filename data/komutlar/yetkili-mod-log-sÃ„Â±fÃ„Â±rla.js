const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
const client = new Discord.Client()
client.emojis.cache.get('784518934711762976');
client.emojis.cache.get('784518943423463484');

const prefix = ayarlar.prefix;

exports.run = async (client, message, args) => { 
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`<a:XTik:798277028050501642> **Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!**`)
  
  let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  
  if(!modlogs) {
      const mdlgno = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<a:XTik:798277028050501642> **Bu sunucuda daha önceden modlog kanalı ayarlanmamış. Ayarlamak için:** \`${prefix}mod-log <#kanal>\``)
      return message.channel.send(mdlgno)
  } else {
    if(modlogs) {    
      db.delete(`modlogkanaly_${message.guild.id}`)
      const mdlgsfrx = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<a:tik1:798276995011051530> **Modlog kanalı başarılı bir sıfırlandı!**`)
      message.channel.send(mdlgsfrx)
    }
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["mod-log-sıfırla"],
    permLevel: 0
}

exports.help = {
    name: 'mod-log-sıfırla',
    description: 'Sıfırlar.',
    usage: 'mod-log-sıfırla'
}