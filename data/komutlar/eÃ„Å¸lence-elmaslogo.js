const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Lütfen yazı yazınız.** <a:Yldz:742698148329291826>`)
  const linqo = `https://habbofont.net/font/palooza_blue/${yazi}.gif`
  .replace(' ', '+')

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("RANDOM")
  .setImage(linqo)
  .setFooter('Elmas Logo Oluşturuldu')
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yazıfoto','yazı-foto', 'elmaslogo'],
    permLevel: 0
}

exports.help = {
    name: 'elmas',
    description: 'Yazdığınız yazıyı dinamik çevirir.',
    usage: 'elmas <yazı>'
}