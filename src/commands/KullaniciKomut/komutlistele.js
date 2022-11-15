const conf = require("../../configs/sunucuayar.json")
const emoji = require("../../configs/emojis.json")
const { green, red } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["komutlistele"],
    name: "komutlistele",
  },

  run: async (client, message, args, embed, prefix) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
    message.react(red)
    return }
let command = args[0]
if (client.commands.has(command)) {
command = client.commands.get(command)
message.lineReply(embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setColor("RANDOM").setDescription(`
a:940191909488513064:1003690714053488741>   Belirttiğin komuta ait bilgiler aşağıda verilmiştir! a:940191909488513064:1003690714053488741>  

<a:icon:992418081156632617>\`Komut Adı\`**:** <a:icon:992418081156632617>${command.conf.name}
<a:icon:992418081156632617>\`Komut Alternatifleri:\`**:** ${command.conf.aliases[0] ? command.conf.aliases.join(', ') : `Alternatif bulunmuyor!`}`))
  return;
    }


let komutlars = (client.commands.filter((x) => x.conf.help).sort((a, b) => b.conf.help - a.conf.help).map((x) => ` \`${prefix}${x.conf.help}\``).splice(0, 300).join("\n"))
message.lineReply(embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`Bu komut <a:963352530526568458:1003706044033277972>JESTER<a:963352530526568458:1003706044033277972> ask için yapılmıştır \`${client.commands.size}\` tane komut kullanılabilirsin ask.

${komutlars}`
))}
  }