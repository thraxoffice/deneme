const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  let sayfalar = [
    `
      > **\<a:emoji_75:807389691892203583> • Sunucu Komutları**
      
      > \<a:emoji_75:807389691892203583> [${prefix}açıklama](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Sunucuda kanalların açıklamasını emojili, sembollü yapabilirsiniz.**
      > \<a:emoji_75:807389691892203583> [${prefix}çek](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sesli kanala istediğiniz kişiyi kolay bir şekilde çekebilirsiniz.**
      > \<a:emoji_75:807389691892203583> [${prefix}git](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sesli kanalinda İstediğiniz Kişinin Yanına Gidebilirsiniz.**
      > \<a:emoji_75:807389691892203583> [${prefix}emoji-ekle](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Sunucuya hızlı bir şekilde emoji yükleyebilirsiniz.**
      > \<a:emoji_75:807389691892203583> [${prefix}kategori-oluştur](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Sunucuda kategori oluşturabilirsiniz.**
      > \<a:emoji_75:807389691892203583> [${prefix}sunucu-panel](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sunucunun istatistiklerini gösteren panel kurarsınız.**
      > \<a:emoji_75:807389691892203583> [${prefix}sunucu-kur](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Gelişmiş bir sunucu kurarsınız.**
      > \<a:emoji_75:807389691892203583> [${prefix}sayaç](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sayaç Kurarsınız.**
      > \<a:emoji_75:807389691892203583>[${prefix}emoji-info](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Emojinin Linkini Ve İd Sini Gorebilirsiniz.**`
  ];
  let page = 1;

  const embed = new Discord.MessageEmbed()
    .setTitle("Guard hp Sunucu Komutları")
    .setTitle("Guard hp Sunucu Komutları")
    .setColor("#501c67")
    .setFooter(`Sayfa ${page} - ${sayfalar.length}`)
    .setDescription(sayfalar[page - 1])
    .setTimestamp()
    .setImage(
      "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
    );

  message.channel.send(embed).then(msg => {
    msg.react("802991211769888808").then(r => {
      msg.react("802990124299714591");

      const backwardsFilter = (reaction, user) =>
        reaction.emoji.name === "sol" && user.id === message.author.id;
      const forwardsFilter = (reaction, user) =>
        reaction.emoji.name === "RainbowOkGif" && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, {
        time: 60000
      });
      const forwards = msg.createReactionCollector(forwardsFilter, {
        time: 60000
      });

      backwards.on("collect", r => {
        if (page === 1) return;
        page--;
        embed.setTitle("Guard hp Sunucu Komutları");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#501c67");
        embed.setTimestamp();
        embed.setImage(
          "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
        );
        msg.edit(embed);
      });

      forwards.on("collect", r => {
        if (page === sayfalar.length) return;
        page++;
        embed.setTitle("Guard hp Sunucu Komutları");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setTimestamp();
        embed.setColor("#501c67");
        embed.setImage(
          "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
        );
        msg.edit(embed);
      });
    });
  });
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "sunucu-menüsü",
    "sunucu listesi",
    "sunucu menüsü",
    "sunucu-listesi"
  ],
  permLevel: 0
};

module.exports.help = {
  name: "sunucu",
  description: "Sunucu komutlarını gösterir.",
  usage: "sunucu"
};
