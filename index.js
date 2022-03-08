const Discord = require("discord.js")
const Cg = require("./config.json")
const { MessageActionRow, MessageButton } = require('discord.js');
const { cli } = require("webpack");

const TOKEN = Cg.TOKEN
const channelId = Cg.channelId
const prefix = Cg.prefix



const client = new Discord.Client({
    intents : [
        "GUILDS",
        'GUILD_MESSAGES'
    ]
})

client.on('ready', () => {
    client.user.setUsername("Offline Actions Bot");
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity(`Staff Permissions`, {type : 'WATCHING'});
})



client.on('messageCreate', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.channel.id === channelId) {
        if (!message.content.startsWith(prefix))
            return;
        
            if (command === 'request') {

            if (isNaN(args[0])) {
                message.channel.send('**ID must be a number!**')
            } else {
                message.delete()
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('user')
                            .setLabel('User')
                            .setStyle('SUCCESS'),

                        new MessageButton()
                            .setCustomId('mod')
                            .setLabel('Moderator')
                            .setStyle('DANGER'),

                        new MessageButton()
                            .setCustomId('admin')
                            .setLabel('Admin')
                            .setStyle('DANGER'),

                        new MessageButton()
                            .setCustomId('superadmin')
                            .setLabel('Superadmin')
                            .setStyle('DANGER'),
                    );
                

                const menu = await message.channel.send({ content: '**'+args[1]+'['+ args[0]+']'+ "** wants in game permission! ", components: [row] });

                setTimeout(() => menu.delete(), 15000)
                client.on("interactionCreate",  interaction => {
                    interaction.reply('```You have set ' + args[1] + '['+ args[0]+'] to group:' +interaction.customId+"```")
                    return exports['dsc-offlineactions'].SetGroup(+args[0], interaction.customId);
                })
            }
            
        }
    }

})



client.login(TOKEN)