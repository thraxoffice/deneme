const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const client = new Discord.Client();
client.emojis.cache.get("807324608532578304");
client.emojis.cache.get("807324608532578304");

const prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      `<a:XTik:798277028050501642> **Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!**`
    );

  let modlogs = db.get(`modlogkanaly_${message.guild.id}`);

  if (!modlogs) {
    let kanal = message.mentions.channels.first();
    if (!kanal)
      return message.reply(
        `<a:XTik:798277028050501642> **Lütfen bir kanal giriniz!** \n> **Doğru Kullanım;** \`${prefix}mod-log <#kanal>\``
      );

    db.set(`modlogkanaly_${message.guild.id}`, kanal.id);
    const modlogkanal = message.guild.channels.cache.find(
      kanal => kanal.id === modlogs
    );
    const mdlgayar = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `<a:tik1:798276995011051530> **Modlog kanalı başarılı bir şekilde ayarlandı.**`
      );
    message.channel.send(mdlgayar);
  } else {
    if (modlogs) {
      const modlogkanal = message.guild.channels.cache.find(
        kanal => kanal.id === modlogs
      );
      const mdlgsfr = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          `<a:XTik:798277028050501642> **Bu sunucuda daha önceden modlog kanalı ayarlanmış. Sıfırlamak için:** \`${prefix}mod-log-sıfırla\`\n**Ayarlanan kanal:** \`${modlogkanal.name}\``
        );
      return message.channel.send(mdlgsfr);
    }
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["modlog"],
  permLevel: 0
};

exports.help = {
  name: "mod-log",
  description: "Log kanalını belirler.",
  usage: "mod-log-ayarla <#kanal>"
};
