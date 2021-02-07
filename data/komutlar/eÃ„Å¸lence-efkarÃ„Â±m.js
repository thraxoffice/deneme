const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  const FwhyCode = Math.floor(Math.random() * 100) + 1;

  return message.channel.send(
    `**Guard hp** \n**Efkarınız:** **%${FwhyCode}** **Efkar** `
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "efkarım",
  description: "Efkarınızı ölçer",
  usage: "efkar Ölçer"
};
