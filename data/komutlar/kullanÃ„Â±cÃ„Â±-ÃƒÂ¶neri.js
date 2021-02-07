const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const client = new Discord.Client();
client.emojis.cache.get("784518934711762976");
client.emojis.cache.get("784518943423463484");

var prefix = ayarlar.prefix;

exports.run = function(client, message, args) {
  let type = args.slice(0).join(" ");
  if (type.length < 1)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        `Kullanım: ${prefix}öneri <Öneri>`
      )
    );
  const embed = new Discord.MessageEmbed()
    .setColor("#ff4400")
    .setDescription(
      "✅ Öneriniz Başarıyla [DestekSunucum](https://discord.gg/3FvxATKfDk) da Bildirildi!"
    );
  message.channel.send(embed);
  const embed2 = new Discord.MessageEmbed()
    .setColor("#ff4400")
    .setDescription(
      `**${message.author.tag}** adlı kullanıcının Bot Hakkında Önerisi:`
    )
    .addField(
      `Kulanıcı Bilgileri`,
      `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nKullanıcı Tagı: ${message.author.discriminator}`
    )
    .addField("Öneri", type)
    .setThumbnail(message.author.avatarURL({ dynamic: true }));
  client.channels.cache.get("798479110090391582").send(embed2); // Kanal ID
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "oneri",
  description: "Bot hakkında öneride bulunursunuz.",
  usage: "öneri <Öneri>"
};
