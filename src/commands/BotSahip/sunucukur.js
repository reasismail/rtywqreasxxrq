const { MessageEmbed, Discord } = require('discord.js');
const data = require('quick.db');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    conf: {
      aliases: ["adonis"],
      name: "adonis",
      help: "adonis"
    },

    run: async (client, message, args, embed) => {
let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author);

    var button_1 = new MessageButton()
    .setID("Kur")
    .setLabel("💻Backup Botu")
    .setStyle("1")

    var button_8 = new MessageButton()
    .setID("Kur8")
    .setLabel("🎙️Musical Botu")
    .setStyle("1")

    var button_2 = new MessageButton()
    .setID("Kur2")
    .setLabel("🛡️Genel Guard Botu")
    .setStyle("3")

    var button_3 = new MessageButton()
    .setID("Kur3")
    .setLabel("🛡️Sekme Guard Botu")
    .setStyle("3")

    var button_4 = new MessageButton()
    .setID("Kur4")
    .setLabel("📟Main Botu")
    .setStyle("1")

    var button_5 = new MessageButton()
    .setID("Kur5")
    .setLabel("🖨️Logger Botu")
    .setStyle("2")

    var button_6 = new MessageButton()
    .setID("Kur6")
    .setLabel("💾Logger 2 Botu")
    .setStyle("2")
///"style":1 mavi
///"style":2 gri
///"style":3 yesil
///"style":4 kırmızı

    var button_7 = new MessageButton()
    .setID("İptal")
    .setLabel("❎iptal")
    .setStyle("red")

    var row = new MessageActionRow()
    .addComponent(button_1)
    .addComponent(button_8)
    .addComponent(button_2)
    .addComponent(button_3)

    var row2 = new MessageActionRow()
    .addComponent(button_4)
    .addComponent(button_5)
    .addComponent(button_6)

    var row3 = new MessageActionRow()
    .addComponent(button_7)

if(message.author.id !== message.guild.owner.user.id) return message.channel.send(
new Discord.MessageEmbed().setThumbnail(message.author.avatarURL())
.setColor('#330066')
.setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
.setDescription(`• \`.adonis\` **kullanmak için,** \`Sunucu Sahibi\` **olmanız gerekiyor.**`)
.addField('Sunucu Sahibi', message.guild.owner.user.tag));

let pusha = new MessageEmbed()
.setDescription(`Adonis Backup Sistemi ⚙️
\`\`\`Backup Botu : "Backup Botu" İçin Buttonuna Tıklamanız Gerekir.
🛡️Genel Guard Botu : "Genel Guard Botu" İçin Buttonuna Tıklamanız Gerekir. 
🛡️Sekme Guard Botu : "Sekme Guard Botu" İçin Buttonuna Tıklamanız Gerekir.
📟Main Botu : "Main Botu" İçin Buttonuna Tıklamanız Gerekir.
🖨️Logger Botu : "Logger Botu" İçin Buttonuna Tıklamanız Gerekir.
💾Logger 2 Botu : "Logger 2 Botu" İçin Buttonuna Tıklamanız Gerekir.
Bot Kurulum İşlemi iptal etmek için : "iptal" \`\`\`
**Botların Tokenlerini Girmeyi Unutmayınız !**`)
.setColor('#330066')
.setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
.setFooter(`Developed By Adonis | Ping: ${client.ws.ping.toFixed(0)}`, member.user.avatarURL({ dynamic: true }))
 let msg = await message.channel.send({ components : [ row, row2, row3 ], embed: pusha})
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {

if(button.id === "Kur") {

message.guild.channels.create('LOG', {type: 'category'}).then(parent => {
message.guild.channels.create('backup', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('chat-guard', {type: 'text'}).then(c => c.setParent(parent.id));
});

message.channel.send(`Botların  kurulumu başarıyla tamamlanmıştır.`)
}
if(button.id === "Kur8") {

    message.guild.channels.create('Musical Logger', {type: 'category'}).then(parent => {
    message.guild.channels.create('Musicaly', {type: 'text'}).then(c => c.setParent(parent.id));
    message.guild.channels.create('Musical-List', {type: 'text'}).then(c => c.setParent(parent.id));
    });
    
    message.channel.send(`Botların  kurulumu başarıyla tamamlanmıştır.`)
    }

if(button.id === "Kur2") {

  message.guild.channels.create('GENEL GUARD', {type: 'category'}).then(parent => {
  message.guild.channels.create('genel-guard', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('sunucu-guard', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('user-guard', {type: 'text'}).then(c => c.setParent(parent.id));
  }); 
  
  message.channel.send(`Bot loglarının kurulumu başarıyla tamamlanmıştır.`)
  }

  if(button.id === "Kur3") {

    message.guild.channels.create('SEKME GUARD', {type: 'category'}).then(parent => {
      message.guild.channels.create('sekme-guard', {type: 'text'}).then(c => c.setParent(parent.id));
      message.guild.channels.create('sekme-tarayici', {type: 'text'}).then(c => c.setParent(parent.id));
      });
    
    message.channel.send(`Bot Tokenleri Girişi Başarıyla Sağlanmıştır.`)
    }

    if(button.id === "Kur4") {

      
      message.guild.channels.create('MAİN LOG', {type: 'category'}).then(parent => {
      message.guild.channels.create('yetki-log', {type: 'text'}).then(c => c.setParent(parent.id));
      message.guild.channels.create('komut-log', {type: 'text'}).then(c => c.setParent(parent.id));
      message.guild.channels.create('market-log', {type: 'text'}).then(c => c.setParent(parent.id));
      message.guild.channels.create('ekip-log-channel', {type: 'text'}).then(c => c.setParent(parent.id));
      message.guild.channels.create('voice-log-channel', {type: 'text'}).then(c => c.setParent(parent.id));
      message.guild.channels.create('rol-log-channel', {type: 'text'}).then(c => c.setParent(parent.id));
      message.guild.channels.create('message-log-channel', {type: 'text'}).then(c => c.setParent(parent.id));
      message.guild.channels.create('mazaretli-log-channel', {type: 'text'}).then(c => c.setParent(parent.id));
      });
      
      message.channel.send(`Bot Tokenleri Girişi Başarıyla Sağlanmıştır.`)
      }

      if(button.id === "Kur5") {
        
        message.guild.channels.create('LOGGER', {type: 'category'}).then(parent => {
        message.guild.channels.create('sunucu-güncelleme', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('kanal-olusturma', {type: 'text'}).then(c => c.setParent(parent.id));  
        message.guild.channels.create('kanad-düzenleme', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('kanal-silme', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('ban-atma', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('ban-kaldırma', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('user-rol-günceleme', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('bot-ekleme', {type: 'text'}).then(c => c.setParent(parent.id));  
        message.guild.channels.create('rol-olusturma', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('rol güncelleme', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('rol-silme', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('webhook', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('emoji-olusturma', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('emoji-güncelleme', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('emoji-silme', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('mesaj-silme', {type: 'text'}).then(c => c.setParent(parent.id));
        message.guild.channels.create('mesaj-düzenleme', {type: 'text'}).then(c => c.setParent(parent.id));
        });
        
        message.channel.send(`Bot Tokenleri Girişi Başarıyla Sağlanmıştır.`)
        }

        if(button.id === "Kur6") {
          
          message.guild.channels.create('LOGGER 2', {type: 'category'}).then(parent => {
          message.guild.channels.create('rol_log', {type: 'text'}).then(c => c.setParent(parent.id));
          message.guild.channels.create('rol_log_basit', {type: 'text'}).then(c => c.setParent(parent.id));
          message.guild.channels.create('nickname_log', {type: 'text'}).then(c => c.setParent(parent.id));
          message.guild.channels.create('join_leave_log', {type: 'text'}).then(c => c.setParent(parent.id));
          message.guild.channels.create('join_leave_basit', {type: 'text'}).then(c => c.setParent(parent.id));
          message.guild.channels.create('ses_log', {type: 'text'}).then(c => c.setParent(parent.id));
          message.guild.channels.create('ses_mic_log', {type: 'text'}).then(c => c.setParent(parent.id));
          message.guild.channels.create('ses_log_basit', {type: 'text'}).then(c => c.setParent(parent.id));
          message.guild.channels.create('mesaj_silme_log', {type: 'text'}).then(c => c.setParent(parent.id));
          message.guild.channels.create('mesaj_edit_log', {type: 'text'}).then(c => c.setParent(parent.id));
          });
          message.channel.send(`Bot Tokenleri Girişi Başarıyla Sağlanmıştır.`)
          }

  
/////////////////////////////////////////////////////
///"style":1 mavi
///"style":2 gri
///"style":3 yesil
///"style":4 kırmızı

if(button.id === "İptal") {
msg.delete();
await button.think(true);
await button.reply.edit(`${button.clicker.member} Başarıyla Bot Login İşlemi İptal Edilmiştir!`)
}

})
}};