const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let prefix = ayarlar.prefix;

  if (!args[0]) {
    const sa = new Discord.MessageEmbed()
      .setColor("#501c67")
      .setDescription(
        `✅ Kanal koruma sistemi açmak için: ${prefix}kanal-koruma aç/kapat`
      )
      .setTimestamp();
    return message.channel.send(sa);
  }
  if (args[0] === "aç") {
    db.set(`kanalk_${message.guild.id}`, "Aktif");
    const sa = new Discord.MessageEmbed()
      .setColor("#501c67")
      .setDescription(`✅ Kanal koruma sistemi başarıyla açıldı!`)
      .setTimestamp();
    return message.channel.send(sa);
  }
  if (args[0] === "kapat") {
    db.delete(`kanalk_${message.guild.id}`);
    const sa = new Discord.MessageEmbed()
      .setColor("#501c67")
      .setDescription(`✅ Kanal koruma sistemi başarıyla Kapatıldı!`)
      .setTimestamp();
    return message.channel.send(sa);
  }
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "kanal-koruma"
};
