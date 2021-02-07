const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

exports.run = (client, message, params) => {
  if (db.fetch(`bakim`)) {
    if (message.author.id !== ayarlar.sahip) {
      const bakıms = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          "⏳ Şuanda Bakım Modu Açıktır. Lütfen Daha Sonra Tekrar Deneyiniz."
        );
      return message.channel.send(bakıms);
    }
  }
  if (!message.guild) {
    const EmbedFwhyCode = new Discord.MessageEmbed()

      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**");

    return message.author.send(EmbedFwhyCode);
  }
  if (message.channel.type !== "dm") {
    const EmbedFwhyCode = new Discord.MessageEmbed()

      .setAuthor(message.author.username + " Polis Geliyor!!!!")
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription("KKK Merkezzzzz!!!!")
      .setImage(
        "http://www.hareketligifler.net/data/media/114/polis-hareketli-resim-0023.gif"
      );

    return message.channel.send(EmbedFwhyCode);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ara155",
  description: "FwhyCode",
  usage: "ara155"
};
