const Discord = require("discord.js");


exports.run = async (client, message, args) => {
  
let user = message.mentions.users.first() || message.author  
  
const exampleEmbed = new Discord.MessageEmbed()
 .setColor("RANDOM")
 .setTitle(`${client.user.username}`)
 .setDescription(`• Kurallar •

Reklam
• Sözlü reklamlar, link ile reklam, özelden reklam, resim ile reklam ve benzeri şekilde reklamlar yapmak yasaktır.

Küfür, Argo, Hakaret
• Her kanalda küfür etmek ve argo kullanmak yasaktır.
• Üyelere karşı hakaret etmek ve dalga geçme yasaktır.

Yetkililer ve Yetki
• Yetki istemek yasaktır.
• Yetkili alımları ile ilgili soru sormak yasaktır.
• Yetkilileri boş yere @etiketlemek ve @etiketleyerek spam yapmak yasaktır.
• Yetkililere saygılı olun.

Spam, Flood, Etiketleme
• Spam yapmak yasaktır.
• Bir kelimeyi sürekli bir mesajda yazmak yasaktır.
• Flood yapmak alt alta yazmak yasaktır.
• Bir üyeyi sürekli @etiketlemek yasaktır.

Din, Siyaset, Cinsellik
• Din ile ilgili konuşmak, tartışmak, kullanıcı adlarını din ile ilgili koymak yasaktır.
• Siyaset ile ilgili konuşmak, tartışmak, kullanıcı adlarını siyaset ile ilgili koymak yasaktır.
• 18+ fotoğraflar paylaşmak ve konuşmak yasaktır.

Kavga, Tartışmak
• Kavga etmek, kavgaya dahil olmak ve tartışmak yasaktır.
•Herhangi bir sorununuz varsa yetkiliye danışınız`)
.setImage("https://cdn.discordapp.com/attachments/798513335439065098/798638180546248755/replace_logo.png")
  message.channel.send(exampleEmbed)
  
  
}
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kurallar',
  description: 'kuralları atar',
  usage: 'kurallar'
}; 