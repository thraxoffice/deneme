const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client()
client.emojis.cache.get('784518934711762976');
client.emojis.cache.get('784518943423463484');

module.exports.run = async (client, message, args) => {  
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "r_";
  if (kontrol == "yokagayok") {
  
      
        let prefix = args.slice(0).join(" ");
        if (!prefix) {
          const embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription(`<a:XTik:798277028050501642> Lütfen bir prefix belirtiniz!`)

          message.channel.send(embed);
          return;
        }
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`<a:tik1:798276995011051530> Prefix; \`${prefix}\` olarak ayarlandı!`)

        message.channel.send(embed);
        db.set(`prefix_${message.guild.id}`, prefix);
     
  
  } else {
   
      
        let prefix = args.slice(0).join(" ");
        if (!prefix) {
          const embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription(`<a:r_hayir:785437821435117608> Lütfen Bir Prefix Belirtiniz!`)

          message.channel.send(embed);
          return;
        }
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`<a:r_evet:785437821926113290> Prefix; \`${prefix}\`olarak ayarlandı!`)

        message.channel.send(embed);
        db.set(`prefix_${message.guild.id}`, prefix);
      
  
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["prefix-ayarla"],
  permLevel: 3,
  kategori: "sunucu"
};

module.exports.help = {
  name: "prefix",
  description: "prefix",
  usage: "prefix-ayarla"
};