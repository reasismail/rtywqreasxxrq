const Discord = require("discord.js")
const { green, red } = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
module.exports = {
    conf: {
      aliases: ["1976"],
      name: "1976",
      help: "1976"
    },
  
    run: async (client, message, args, embed) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) { message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000}))
        message.react(red)
        return }
        const tag = args.slice(0).join("1976") || conf.discrim;
        let page = 1;
        const memberss = message.guild.members.cache.filter((member) => member.user.discriminator.includes(tag) && !member.user.bot);
        let liste = memberss.map((member) => `${member} - \`${member.id}\``) || `**#${tag}** etiketli kullanıcı yok`
        var msg = await message.channel.send(new Discord.MessageEmbed().setDescription(`Kullanıcı adında **#${tag}** tagı olan **${memberss.size}** kişi bulunuyor:\n\n ${liste.slice(page == 1 ? 0 : page * 40 - 40, page * 40).join('\n')}`).setColor("RANDOM"));
        if (liste.length > 40) {
            await msg.react(`⬅️`);
            await msg.react(`➡️`);
            let collector = msg.createReactionCollector((react, user) => ["⬅️", "➡️"].some(e => e == react.emoji.name) && user.id == message.member.id, { time: 200000 });
            collector.on("", (react) => {
                if (react.emoji.name == "➡️") {
                    if (liste.slice((page + 1) * 40 - 40, (page + 1) * 40).length <= 0) return;
                    page += 1;
                    let tagsay = liste.slice(page == 1 ? 0 : page * 40 - 40, page * 40).join("\n");
                    msg.edit(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Kullanıcı adında **#${tag}** tagı olan **${memberss.size}** kişi bulunuyor:\n\n${tagsay}`).setColor("RANDOM"));
                    react.users.remove(message.author.id)
                }
                if (react.emoji.name == "⬅️") {
                    if (liste.slice((page - 1) * 40 - 40, (page - 1) * 40).length <= 0) return;
                    page -= 1;
                    let tagsay = liste.slice(page == 1 ? 0 : page * 40 - 40, page * 40).join("\n");
                    msg.edit(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Kullanıcı adında **#${tag}** tagı olan **${memberss.size}** kişi bulunuyor:\n\n${tagsay}`).setColor("RANDOM"));
                    react.users.remove(message.author.id)
                }
            })
        }
      },
    };
