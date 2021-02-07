const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');

exports.run = (client, message) => {  
  message.channel.send('Espri Yükleniyor...').then(message => {
    var espriler = ['Dün senin için ölenler nerdeler?, Dün öldüler ya abi...', 'Kaç yaşındasın?, Kaç gösteriyorum?, Kaçtım göster.', '"Hayatım İvana Sertin türkçesi gibi, asla düzelmiyor" diyen arkadaşlar bizımla mı?', '+ Kanka millet özenti olmuş \n - Niye Lan \n +Yolda yürüyorum \n - Eee \n + Bi baktım herkes yürüyo lan', 'Baba: Nerdesin oğlum? \n Çoçuk: Berkedeyim baba ders çalışıyoruz. Sen napıyorsun? \n Ne yapayim bende diskoda arkandaki masada birşeyler içiyom.', 'Bildiğim tek bir şey var o da hiç bir şey bilmediğim :D', 'Rock yapmayan kişiye ne denir? - Yaprock.', 'Ben Yedigün içiyorum sen Onbeşgün iç.', 'Sinemada on dakika ara dedi, aradım aradım açmadı.', 'Röntgen Filmi çektirdik, yakında sinemalarda.', 'Yeni yapılmış resimlere ne denir? - ‘Nev’resim.', 'Türkiye’nin en yeni şehri – Nevşehir', 'Acıkan var mı ya? -Yok bizde tatlı kan var.', 'GİT’Arı’ getirde biraz şarkı söyleyelim. -Abi arı sokmasın!', 'Masada hangi örtü kullanılmaz? - Bitki Örtüsü.', 'İnsanların seni ezmesine izin verme; Ehliyet al, sen onları ez...', 'Elektriği Edison buldu ama parasını niye biz ödüyoruz.', 'Mafya babası olmak için oğlumun adını “Mafya” koydum.', 'Hava korsanı uçağı kaçıracaktı ama yapamadı çünkü uçağı kaçırdı.', 'Adamın tekinin kalbi çalışmıyormuş neden? -- Çünkü taş kalpliymiş.', 'Abi sen tüp bebek misin? -- Gaz kaçırıyorsun da.', 'Pişmemiş burgere ne denir? -- Hamburger.', 'Dört tarafı suyla çevrili çaya ne denir? -- Adaçayı.', 'Annemin bahsettiği elalem diye bir örgüt var illuminatiden daha tehlikeli yemin ederim.', '+ Kanka fenomen oldum. \n - Nasıl? \n - Bugün yetimğaneye gittiğim kadın beni tanıdı.'];
          var espri = espriler[Math.floor(Math.random() * espriler.length)];
              const espris = new Discord.MessageEmbed()
              .setColor("BLACK")
              .setTitle("Espri")
              .setDescription(`${espri}`)
              message.channel.send(espris);
  });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['espri-yap', 'espri', 'espiri-yap'],
  permLevel: 0
};

exports.help = {
  name: 'espri',
  description: 'Bota Espiri Yaptırırsınız.',
  usage: 'espri'
}