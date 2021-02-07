const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();
client.emojis.cache.get("▶");
client.emojis.cache.get("◀");

exports.run = async (client, message, args) => {
  let prefix =
    (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
    ayarlar.prefix;

  if (message.author.id !== ayarlar.sahip)
    return message.channel.send(
      `✅ ${prefix}capslock-engelle **aç** veya **kapat** yaz.`
    );
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      "✅ Bu komutu kullanmak için `SUNUCUYU_YÖNET` yetkisine sahip olman gerek!"
    );

  if (args[0] == "kapat") {
    var replace = await db.set(`capslockengl_${message.guild.id}`, "kapali");
    db.delete(`capslock_${message.guild.id}`);
    const kapali = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        "✅ Capslock engelleme sistemi kapatıldı, herkes büyük harf kullanabilecek."
      );
    message.channel.send(kapali);
  }

  if (args[0] == "aç") {
    var replace = await db.set(`capslockengl_${message.guild.id}`, "açik");
    const acik = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        "✅ Capslock engelleme sistemi aktif, kimse büyük harf kullanamayacak"
      );
    message.channel.send(acik);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["capslock-engel"],
  permLevel: 3
};

exports.help = {
  name: "capslock-engelleme",
  category: "Moderasyon komutları!",
  description: "Capslock kullanımını engeller.",
  usage: "capslock-engelle"
};
