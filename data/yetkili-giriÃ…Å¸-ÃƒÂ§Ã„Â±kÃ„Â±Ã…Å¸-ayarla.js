const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const client = new Discord.Client();
client.emojis.cache.get("784518934711762976");
client.emojis.cache.get("784518943423463484");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.reply(
      `✅ Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`
    );

  let channel = message.mentions.channels.first();
  if (!channel) {
    const kanalet = new Discord.MessageEmbed().setDescription(
      "✅ Bir kanal etiketleyin"
    );
    message.channel.send(kanalet);
    return;
  }
  db.set(`gçkanal_${message.guild.id}`, channel.id);
  var i = db.set(`capsE_${message.guild.id}`, "acik");
  const ayarlandı = new Discord.MessageEmbed().setDescription(
    `✅ ** Resimli Hoşgeldin - Güle Güle kanalı ${channel} Olarak Ayarlandı.** `
  );
  message.channel.send(ayarlandı);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gç-ayarla"],
  permLevel: 0
};

exports.help = {
  name: "giriş-çıkış-ayarla",
  description: "Giriş Çıkış Kanalını Ayarlar.",
  usage: "giriş-çıkış-ayarla <#kanal>"
};
