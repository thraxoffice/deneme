const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();
client.emojis.cache.get("783222083302850570");
let prefix = ayarlar.prefix;
client.emojis.cache.get("784518934711762976");

exports.run = async (client, message, args) => {
  let bug = args.join(" ").slice(0);
  if (!bug) return message.channel.send("Lütfen bugu giriniz!");
  let user = message.author.username;
  let guild = message.guild.name;
  let guildid = message.guild.id;
  let kanal = message.channel.name;
  let channel = client.channels.cache.get("798479109415370752"); //bug repot kanal id'i
  let embed = new Discord.MessageEmbed()
    .setTitle("Guard hp Bug Report")
    .addField("Hata-Bug", bug)
    .addField("Report Eden", user, true)
    .addField("Premium Sunucu", guild, true)
    .addField("Premium Sunucu ID", guildid, true)
    .addField("Sunucu Kanal", kanal, true)
    .setColor("#ff4400");
  channel.send(embed);
  message.channel.send(
    "<a:yr_trnctac:797757061353963540> Bug başarıyla kanala iletildi."
  );
  message.react("⏳");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "bug-bildir",
  description: "Çalışıp para kazanırsınız.",
  usage: "bug-bildir"
};
