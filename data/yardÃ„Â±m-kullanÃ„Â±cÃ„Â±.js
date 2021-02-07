const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  let sayfalar = [
    `
      > **\<a:emoji_18:772535918498283561> • Kullanıcı Komutları**
      
      > \<a:emoji_18:772535918498283561> [${prefix}afk](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Sunucunuzda bu komutu kullanarak afk olduğunuzu belirtip etiketlenince size bildirim gelmez.**
      > \<a:emoji_18:772535918498283561> [${prefix}bizkimiz](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Botun ekibi hakkında bilgi verir.**
      > \<a:emoji_18:772535918498283561> [${prefix}bug-bildir](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Botta herhangi bir bug olduğunu anladığınız kesinleştirdiğiniz zaman bize iletebilirsiniz.**
      > \<a:emoji_18:772535918498283561> [${prefix}davet](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Botumuzun davet linki, destek sunucu linkini gösterir.**
      > \<a:emoji_18:772535918498283561> [${prefix}profil](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sizin veya kullanıcı hakkında bilgi verir.**
      > \<a:emoji_18:772535918498283561> [${prefix}canlı-destek](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Botta ayarlayamadığınız komutları veya çalışmayan komutları bize canlı destek sayesinde ayarlarız.**
      > \<a:emoji_18:772535918498283561> [${prefix}istatistik](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Bot hakkında bilgi verir.**`,
    `
      
      > ** \<a:emoji_18:772535918498283561> • Kullanıcı 2 Komutları**
      
      > \<a:emoji_18:772535918498283561> [${prefix}korona <ülke>](https://bit.ly/3smfu3C) 
      > **• Covid19 hakkında bilgi verir.**
      > \<a:emoji_18:772535918498283561> [${prefix}davetlerim](https://bit.ly/3smfu3C) 
      > **• Kaç Davet Yaptiğin Hakkında Bilgi Verir.**
      > \<a:emoji_18:772535918498283561> [${prefix}ping](https://bit.ly/3smfu3C) 
      > **• Botun pingini gösterir.**
      > \<a:emoji_18:772535918498283561> [${prefix}rol-bilgi](https://bit.ly/3smfu3C) 
      > **• Sunucudaki herhangi bir rolün bilgisini verir.**
      > \<a:emoji_18:772535918498283561> [${prefix}sunucu-bilgi](https://bit.ly/3smfu3C) 
      > **• Sunucu hakkın bilgiler verir.**
      > \<a:emoji_18:772535918498283561> [${prefix}sunucu-tanıt](https://bit.ly/3smfu3C) 
      > **• Kendi sunucunu botun destek sunucusunda tanıtırsın.**
      > \<a:emoji_18:772535918498283561> [${prefix}yılbaşı](https://bit.ly/3smfu3C) 
      > **• Yılbaşına kalan zamanı gösterir.**
      > \<a:emoji_18:772535918498283561> [${prefix}oneri](https://bit.ly/3smfu3C) 
      > **• Bot hakkında önerilerinizi bize iletebilirsiniz.**
      > \<a:emoji_18:772535918498283561> [${prefix}sikayet](https://bit.ly/3smfu3C) 
      > **• Bot hakkında şikayetlerinizi bize iletebilirsiniz.**
      
      > \<a:emoji_64:802991211769888808> •\`\Geri Dönmek İçin Emojiye\`\ \<a:emoji_56:802990124299714591> \`\Tıklayın\`\ `
  ];
  let page = 1;

  const embed = new Discord.MessageEmbed()
    .setTitle("Guard hp Kullanıcı Menüsü")
    .setColor("#ff4400")
    .setFooter(`Sayfa ${page} - ${sayfalar.length}`)
    .setDescription(sayfalar[page - 1])
    .setTimestamp();

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
        embed.setTitle("Guard hp Kullanıcı Menüsü");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#ff4400");
        embed.setTimestamp();
        embed.setImage(
          "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
        );
        msg.edit(embed);
      });
      forwards.on("collect", r => {
        if (page === sayfalar.length) return;
        page++;
        embed.setTitle("Guard hp Ayarlanabilir Sistemler");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#084e0d");
        embed.setTimestamp();
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
    "kullanıcı listesi",
    "kullanıcı menüsü",
    "kullanıcı-listesi",
    "yardım kullanıcı"
  ],
  permLevel: 0
};

module.exports.help = {
  name: "kullanıcı",
  description: "Kullanıcı komutlarını gösterir.",
  usage: "kullanıcı"
};
