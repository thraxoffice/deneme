const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();
client.emojis.cache.get('784518934711762976');
client.emojis.cache.get('784518943423463484'); 

exports.run = async (client, message, args) => { 
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.reply(`<a:XTik:798277028050501642> Bu komutu kullanabilmek için **Sunucuyu Yönet** iznine sahip olmalısın!`);
  let prefix = ayarlar.prefix;
 
  if (db.has(`gçkanal_${message.guild.id}`) === true) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`<a:XTik:798277028050501642> Giriş çıkışı Ayarlamadığın İçin Sıfırlayamazsın!`)
      .setColor("RED")
      .setTimestamp(`<a:XTik:798277028050501642> Ayarlamak İçin ${prefix}giriş-çıkış-ayarla #kanal`);
    message.channel.sent()
    return;
  }
  db.delete(`gçkanal_${message.guild.id}`);
 
  const embed = new Discord.MessageEmbed()
    .setDescription(`<a:tik1:798276995011051530> Giriş Çıkış Başarıyla Sıfırlandı`)
    .setColor("RANDOM")
    .setTimestamp();
  message.channel.send(embed);
  return;
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["giriş-çıkış-sıfırla"],
  permLevel: 0
};
 
exports.help = {
  name: "giriş-çıkış-kapat",
  description: "Giriş çıkışı kapatır",
  usage: "giriş-çıkış-sıfırla"
};