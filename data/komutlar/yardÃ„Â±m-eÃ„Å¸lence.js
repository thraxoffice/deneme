const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  let sayfalar = [
    `
  > **\<a:emoji_13:772536068183818270> • Eğlence Komutları**
  
  > \<a:emoji_13:772536068183818270> [${prefix}öp](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Birini öpersiniz.**
  > \<a:emoji_13:772536068183818270> [${prefix}ara155](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• 155'i Arar.(Ciddiye Alma :))**
  > \<a:emoji_13:772536068183818270> [${prefix}espri](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bot farklı türden esprililer yapar.**
  > \<a:emoji_13:772536068183818270> [${prefix}balıktut](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Oltayı atıp balık tutarsınız.**
  > \<a:emoji_13:772536068183818270> [${prefix}desteaç](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Zula'da deste açarsınız.(Gerçek Değildir.)**
  > \<a:emoji_13:772536068183818270> [${prefix}kasaaç](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Cs:Go'da kasa açarsınız.(Gerçek Değildir.)**
  > \<a:emoji_13:772536068183818270> [${prefix}hesapla](hhttps://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Yaptığınız işlemi hesaplarsınız.**
  > \<a:emoji_13:772536068183818270> [${prefix}duello](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Arkadaşlarınızla duello atarsınız.**
  > \<a:emoji_13:772536068183818270> [${prefix}snipe](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Silinen Son Mesajı Atar.**,
  
  > <a:ayarlar:772535583142182943> •\`\Eğlence Komutların Devamı İçin Emojiye\`\ <a:sol:807972252435349554> \`\Tıklayın\`\ `,
    `
  > **<a:emoji_13:772536068183818270> • Eğlence Komutları**
  
  > \<a:emoji_13:772536068183818270> [${prefix}efkarım](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bot sizin efkarınızı ölçer.**
  > \<a:emoji_13:772536068183818270> [${prefix}kaç-cm](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bot size kaç cm olduğunu söyler.**
  > \<a:emoji_13:772536068183818270> [${prefix}slots](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
  > **• Slot oyunu oynarsınız.**
  > \<a:emoji_13:772536068183818270> [${prefix}kral-ol](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Artık kral siz olursunuz.**
  > \<a:emoji_13:772536068183818270> [${prefix}alevlogo](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bir mesaj yazınca alevli yazıları logo olarak çevirir.**
  > \<a:emoji_13:772536068183818270> [${prefix}altınlogo](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bir mesaj yazınca altın yazıları logo olarak çevirir.**
  > \<a:emoji_13:772536068183818270> [${prefix}elmaslogo](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bir mesaj yazınca elmas yazıları logo olarak çevirir.**
  > \<a:emoji_13:772536068183818270> [${prefix}soygun-yap](https://discord.com/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Soygun Yaparsınız (Gerçek Değildir).**
 
  > <a:ayarlar:772535583142182943> •\`\Geri Dönmek İçin Emojiye\`\ <a:sol:807972252435349554> \`\Tıklayın\`\ `
  ];
  let page = 1;

  const embed = new Discord.MessageEmbed()
    .setTitle("Guard hp Eğlence Menüsü")
    .setColor("#d81414")
    .setImage(
      "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
    )
    .setFooter(`Sayfa ${page} - ${sayfalar.length}`)
    .setDescription(sayfalar[page - 1])
    .setTimestamp();

  message.channel.send(embed).then(msg => {
    msg.react("772535583142182943").then(r => {
      msg.react("807972252435349554");

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
        embed.setTitle("Guard hp Eğlence Menüsü");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setTimestamp();
        embed.setColor("#d81414");
        embed.setImage(
          "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
        );
        msg.edit(embed);
      });

      forwards.on("collect", r => {
        if (page === sayfalar.length) return;
        page++;
        embed.setTitle("Guard hp Eğlence Menüsü");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setTimestamp();
        embed.setColor("#d81414");
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
    "eğlence menüsü",
    "eğlence listesi",
    "eğlence-menüsü",
    "eğlence-listesi"
  ],
  permLevel: 0
};

module.exports.help = {
  name: "eğlence",
  description: "Eğlence komutlarını gösterir.",
  usage: "eğlence"
};
