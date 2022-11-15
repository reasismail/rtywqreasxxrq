const { green, red } = require("../../configs/emojis.json") 

module.exports = {
  conf: {
    aliases: [],
    name: "koruma",
    owner: true,
  },

  run: async (client, message, args,embed) => {
    if(!args[0]){
        message.react(red)
        message.channel.send(embed.setDescription(`Bir argüman belirtmelisin! \`aç - kapat\``)).then(x=>x.delete({timeout:5000}))
        }
        if(args[0] == "aç") {
        message.channel.send(`Koruma açıldı! Rollerin yetkileri kapatıldı! Sunucu güvende!`)
        message.react(green)
        const yetki1 = message.guild.roles.cache.find(r => r.id === "996887827604308072");//#OWNER
        yetki1.setPermissions(0);
        const yetki2 = message.guild.roles.cache.find(r => r.id === "996887830959751229");//#Ceo
        yetki2.setPermissions(0);
        const yetki3 = message.guild.roles.cache.find(r => r.id === "996887834357153974");//#Yıldız
        yetki3.setPermissions(0);       

     }


       
  
        if(args[0] == "kapat") {
        message.channel.send(`Koruma kapatıldı! Rollerin yetkileri yüklendi! Dikkatli olman dileğiyle!`)
        message.react(green)
        const yetki1 = message.guild.roles.cache.find(r => r.id === "996887827604308072");//#Owner
        yetki1.setPermissions(8);
        const yetki2 = message.guild.roles.cache.find(r => r.id === "996887830959751229");//#Ceo    
        yetki2.setPermissions(8);
        const yetki3 = message.guild.roles.cache.find(r => r.id === "996887834357153974");//#Yıldız
        yetki3.setPermissions(8);
        
    }
},
};
