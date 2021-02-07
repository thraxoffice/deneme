const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  let sayfalar = [
    `
      > **\<a:emoji_30:772535523121430569> • Yetkili Komutları**
      
      > \<a:emoji_30:772535523121430569> [${prefix}ban @kullanıcı](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8)
      > **• Sunucudan banlamak istediğiniz kişiyi etiketleyip banlarsınız.**
      > \<a:emoji_30:772535523121430569> [${prefix}unban](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Sunucudaki kişilerin banını geri açarsınız..**
      > \<a:emoji_30:772535523121430569> [${prefix}oylama](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Sunucuda oylama yaparsınız.**  
      > \<a:emoji_30:772535523121430569> [${prefix}mute](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Sunucdaki kişileri süreli bir şekilde susturabilirsiniz.**
      > \<a:emoji_30:772535523121430569> [${prefix}unmute](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Susturulan kişinin mutesini açabilirsiniz.**
      > \<a:emoji_30:772535523121430569> [${prefix}slowmode](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Sunucuda yavaş modu açarsınız. İnsanların spam yapmasına önler getirmiş olursunuz.**
      > \<a:emoji_30:772535523121430569> [${prefix}kick @kullanıcı](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Sunucudaki istedğiniz kişileri sunucudan atabilirsiniz.**  
      
      > \<a:emoji_64:802991211769888808> •\`\Yetkili Komutların Devamı İçin Emojiye\`\ \<a:emoji_56:802990124299714591> \`\Tıklayın\`\ `,
    `
      > **\<a:emoji_30:772535523121430569> • Yetkili Komutları**
      
      > \<a:emoji_30:772535523121430569> [${prefix}giriş-çıkış-ayarla](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Resimli giriş çıkış kanalını ayarlarsınız.**
      > \<a:emoji_30:772535523121430569> [${prefix}giriş-çıkış-sıfırla](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Resimli giriş çıkış kanalını sıfırlarsınız.**
      > \<a:emoji_30:772535523121430569> [${prefix}mod-log #kanal](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Mod-Log kanalını ayarlarsınız bu sayede silinen rol, mesaj vb görebilirsiniz.**
      > \<a:emoji_30:772535523121430569> [${prefix}mod-log-sıfırla](https://discord.com/oauth2/authorize?client_id=794482280437514241&scope=bot&permissions=8) 
      > **• Mod-Log kanalını sıfırlarsınız.**
      
      > \<a:emoji_64:802991211769888808> •\`\Yetkili Komutların Devamı İçin Emojiye\`\ \<a:emoji_56:802990124299714591> \`\Tıklayın\`\ `,
    `
      > ** \<a:emoji_30:772535523121430569> • Yetkili Komutları**
      
      > \<a:emoji_30:772535523121430569> [${prefix}ototag-ayarla](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sunucuya girenlere verilecek ototag ayarlarsınız..**
      > \<a:emoji_30:772535523121430569> [${prefix}ototag-kanal](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Ototag Kanalını Ayarlarsınız**
      > \<a:emoji_30:772535523121430569> [${prefix}prefix-ayarla](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Botun prefixi değiştirebilirsiniz.**
      > \<a:emoji_30:772535523121430569> [${prefix}prefix-sıfırla](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Botun prefixi eski haline getirirsiniz.**
      > \<a:emoji_30:772535523121430569> [${prefix}capslock-engelle](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sunucuda büyük harf kullanımını engeller. Kimse büyük harf kullanamaz.**
      > \<a:emoji_30:772535523121430569> [${prefix}küfür-engelle](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sunucuda küfür etmelerini engeller. Kimse küfür edemez.**
      > \<a:emoji_30:772535523121430569> [${prefix}reklam-engelle](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sunucuda reklam yapmalarını engeller. Kimse reklam yapamaz.**
      > \<a:emoji_30:772535523121430569> [${prefix}toplam-komut](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Botun İçinde Kac Komut Oldugunu Gösterir.**
      
      > \<a:emoji_64:802991211769888808> •\`\Diğer Sistemlere Gitmek İçin Emojiye\`\ \<a:emoji_56:802990124299714591> \`\Tıklayın\`\ `
  ];
  let page = 1;
  const embed = new Discord.MessageEmbed()
    .setTitle("Guard hp Yetkili Menüsü")
    .setColor("#ffe200")
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
        embed.setTitle("Guard hp Yetkili Menüsü");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#ffe200");
        embed.setTimestamp();
        embed.setImage(
          "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
        );
        msg.edit(embed);
      });

      forwards.on("collect", r => {
        if (page === sayfalar.length) return;
        page++;
        embed.setTitle("Guard hp Yetkili Menüsü");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#ffe200");
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
    "yetkili listesi",
    "yetkili menüsü",
    "yetkili-listesi",
    "yetkili-menüsü"
  ],
  permLevel: 0
};

module.exports.help = {
  name: "yetkili",
  description: "Yetkili komutlarını gösterir.",
  usage: "yetkili"
};
