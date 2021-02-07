const Discord = require("discord.js");
const math = require("math-expression-evaluator");
const stripIndents = require("common-tags").stripIndents;
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {
  var soru = args.join(" ");

  if (!soru)
    return message.reply(
      "**Bir işlem belirtin.** `Örnek`: **hesapla <işlem>**"
    );
  else {
    let cevap;
    try {
      cevap = math.eval(soru);
    } catch (err) {
     return message.channel.send("**Hatalı işlem: **" + err);
    }

    const EmbedFwhyCode = new Discord.MessageEmbed()

      .addField("Soru", soru)
      .addField("Cevap", cevap);

    return message.channel.send(EmbedFwhyCode);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "hesapla",
  description: "Belirtilen işlemi yapar.",
  usage: "hesapla <işlem>"
};
