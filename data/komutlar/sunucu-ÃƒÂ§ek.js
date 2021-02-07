const Discord = require("discord.js");

exports.run = async (client, message, args) => {

if (!message.member.voice.channel) {
return message.reply("**Bu komutu kullanmadan önce herhangi bir ses kanalına gir!**");
}
const filter = (reaction, user) => {
return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
};
  
let kullanıcı = message.mentions.members.first()
if (!kullanıcı) return message.channel.send('**Bir kullanıcı etiketle!**');

let member = message.guild.member(kullanıcı);

if (!member.voice.channel) return message.channel.send('**Etiketlenen kullanıcı ses kanalında değil!**').then(m => m.delete,{timeout: 5000});

const voiceChannel = message.member.voice.channel.id;
if (!voiceChannel) return;
  
let log = new Discord.MessageEmbed()
.setColor("#7289D")
.setDescription(`${kullanıcı}, ${message.author} \`${message.member.voice.channel.name}\` **odasına çekmek istiyor! Kabul ediyor musun?**`)
  
let mesaj = await message.channel.send(log)
await mesaj.react("✅")
await mesaj.react("❌")
mesaj.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ['time']
}).then(collected => {
const reaction = collected.first();
if (reaction.emoji.name === '✅') {
let kabul = new Discord.MessageEmbed()
.setColor("0x348f36")
.setDescription(`${kullanıcı} **odaya çekilme teklifi onaylandı!**`)
message.channel.send(kabul)
kullanıcı.voice.setChannel(message.member.voice.channel.id)
} else {
let striga = new Discord.MessageEmbed()
.setColor("0x800d0d")
.setDescription(`${kullanıcı} **odaya çekilme teklifi reddedildi!**`)
message.channel.send(striga)
}
})
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ses-çek"],
  permLevel: 0,
}

exports.help = {
  name: 'çek'
  
}