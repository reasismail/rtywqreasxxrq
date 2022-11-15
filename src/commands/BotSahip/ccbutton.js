
const Settings = require('../../configs/settings.json')
const { MessageButton } = require("discord-buttons");

module.exports = {
    conf: {
      aliases: ["ccbutton"],
      name: "ccbutton"
    },
  
run: async (client, message, args, embed, prefix) => {
    if((Settings.owners.includes(message.author.id) === false)) 
    {
      message.lineReply(embed.setDescription(`Yeterli yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
    return } 

    let cezabutton = new MessageButton()
.setStyle("3")
.setID("cezabutton")
.setLabel("📛 Kontrol Et")
///"style":1 mavi
///"style":2 gri
///"style":3 yesil
///"style":4 kırmızı

message.channel.send(":tada: Merhabalar, Sunucumuza tekrardan hoşgeldin. görünüşe göre hesabın yakın bir zamanda kurulmuş gözüküyor. içeri girmen için 2 farklı durum bulunuyor tagımızı alıp herhangi bir yetkiliye yazabilir veya hesabın \`15\` günü geçtikten sonra aşşağıda ki butonu kullanabilirsin.",{
    buttons: [cezabutton]
})


    }
  };
  