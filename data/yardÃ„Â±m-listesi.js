const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

exports.run = async (client, message, member, args) => {
  let gold = await db.fetch(`gold_${message.member.id}`);
  let user = message.mentions.users.first() || message.author;
  const yardimlistesi2 = new Discord.MessageEmbed()
    .setColor("#066bc3")
    .setThumbnail("", client.user.avatarURL({ dynamic: true }))
    .setAuthor("Guard hp Yardım Menüsü")
    .setDescription(
      `
  > **Merhaba <@${message.author.id}> kullanıcım.
  > Benim Prefixim: ${prefix}
  > Benim Dilim: Türkçe
  > Gold Üye Durumu: ${gold ? "``Gold Üye``" : " ``Normal Üye``"}**

  > Guard hp **♯ Bot Komutları**
  > \<a:emoji_13:772536068183818270> ⁝ [${prefix}eğlence](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) > • **Eğlence komutlarını gösterir.**
  > \<a:emoji_18:772535918498283561> ⁝ [${prefix}kullanıcı](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) > • **Kullanıcı komutlarını gösterir.**
  > \<a:emoji_30:772535523121430569> ⁝ [${prefix}yetkili](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) > • **Yetkili komutlarını gösterir.**
  > \<a:emoji_67:805502297353879603> ⁝ [${prefix}koruma](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) > • **Koruma sistemi komutlarını gösterir.**
  > \<a:emoji_66:805501864392917072> ⁝ [${prefix}youtube](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) > • **Youtube sistemi komutlarını gösterir.**
  > \<a:emoji_75:807389691892203583> ⁝ [${prefix}sunucu](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) > • **Sunucu komutlarını gösterir.**
  > \<a:emoji_77:807389727396724786> ⁝ [${prefix}sistemler](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) > • **Otocevap sistemi, bilet sistemi vb. komutları gösterir.**
  
  > ** \<a:emoji_51:776430426972618783> ⁝ Güncellemeler**
  > • **Tr:** Bot Şuan Aktiftir. Komutlari Kullanabilirsiniz! | **En:** Our bot is Online. You Can Use Commands!
  > \<a:emoji_76:807389705553444904> • Hepinize İyi Eğlenceler Dilerim...
  
  > **:link: ⁝ Linkler -->**
  > • [Beni Ekle](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) • [Destek Sunucum](https://discord.gg/T4nkSKys5h) • [Oy Ver] () •
  
  `
    )
    .setFooter(`Guard hp Yardım Menüsü`)
    .setTimestamp()
    .setImage(
      "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
    );
  message.channel.send(yardimlistesi2);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım-menüsü", "yardım-listesi"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Yardım listesini gösterir.",
  usage: "yardım"
};
