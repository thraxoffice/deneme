const Discord = require("discord.js");
const db = require("quick.db");

const moment = require("moment");
const os = require("os");
require("moment-duration-format");
exports.run = async (bot, message, args) => {
  const seksizaman = moment
    .duration(bot.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.MessageEmbed()
    .setColor("#ff4400")
    .setThumbnail(
      "https://media.discordapp.net/attachments/785558053902745611/786143739499642880/static_3.png?width=205&height=205",
      bot.user.avatarURL({ dynamic: true }),
      true
    )
    .setTitle(
      "Replace Bot \\ Buyur Benim İstatistiklerim",
      bot.user.avatarURL({ dynamic: true })
    )
    .addField("👑 » Bot Sahibi", "• <@730805817451872328>", true)
    .addField("💻 » **Geliştirici** ", "<@730805817451872328>", true)
    .addField(
      "📟 » **Bellek Kullanımı**",
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB",
      true
    )
    .addField("📟 » **Çalışma Durumu**", seksizaman, true)
    .addField(
      "📟 » **Kullanıcı Sayısı**",
      bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
      true
    )
    .addField(
      "📟 » **Sunucu Sayısı**",
      bot.guilds.cache.size.toLocaleString(),
      true
    )
    .addField(
      "📟 » **Kanal Sayısı**",
      bot.channels.cache.size.toLocaleString(),
      true
    )
    .addField("📟 » **Ping Durumu**", bot.ws.ping + " ms", true)
    .addField("<📟 » **Discord.js Sürümü**", `${Discord.version}`, true)
    .addField(
      "📟 » **Beni Sunucuna**",
      " [Eklemeyi Unutma](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)",
      true
    )
    .addField(
      "📟 » **Destek Sunucum**",
      "[Katılmayı Unutma](https://discord.gg/3FvxATKfDk)",
      true
    )
    .addField("📟 » **Bota Oy Ver**", "[YAKINDA](Yakında)", true);
  return message.channel.send(istatistikler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "bilgi", "istatistik", "bot-bilgi", "bot-istatistik"],
  permLevel: 0
};

exports.help = {
  name: "bilgi",
  description: "Bot i",
  usage: "bilgi"
};
