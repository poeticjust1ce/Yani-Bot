import { Client, IntentsBitField, EmbedBuilder, Embed } from "discord.js";
import { getStock, getPrev, getBeforePrev, getTimeLeft } from "./getStock.js";
import * as dotenv from "dotenv"
import { imageSelect } from "./imageSelect.js";

dotenv.config()

const token = process.env.TOKEN


const config = {
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
}

const client = new Client(config)

client.on('ready', c => {
    console.log(`✅ ${c.user.username} is online!`)
})

client.on ('interactionCreate', async (i) => {
    if (!i.isChatInputCommand()) return;

    if (i.commandName === 'status') {
        i.reply(`😺 Bot is online!`)
    }


    if (i.commandName === 'stock') {
        try {
            getStock()
            .then(async (el) => {
                const timeLeft = await getTimeLeft()
                const titleEmbed = new EmbedBuilder()
                .setColor(0x009c3f)
                .setAuthor({name: `Next Stock in:\n${timeLeft}`})
                .setTitle('**Current Stock:**')

                const embedData = 
                    el.map(el => {
                        return new EmbedBuilder()
                        .setColor(0x009c3f)
                        .setTitle(`${el.name}`)
                        .setDescription(`$${el.price}`)
                        .setThumbnail(imageSelect(`${el.name}`))
                    })
                

                i.channel.send({embeds: [titleEmbed]})
                i.channel.send({embeds: embedData})
            })
            
        } catch (err) {
            console.error(err)
        }
    }

    if (i.commandName === 'prev') {
        try {
            getPrev()
            .then(async (el) => {
                const titleEmbed = new EmbedBuilder()
                .setColor(0x009c3f)             
                .setTitle('**Previous Stock:**')

                const embedData = 
                    el.map(el => {
                        return new EmbedBuilder()
                        .setColor(0x009c3f)
                        .setTitle(`${el.name}`)
                        .setDescription(`$${el.price}`)
                        .setThumbnail(imageSelect(`${el.name}`))
                    })
                

                i.channel.send({embeds: [titleEmbed]})
                i.channel.send({embeds: embedData})
            })
            
        } catch (err) {
            console.error(err)
        }
    }

    if (i.commandName === 'beforeprev') {
        try {
            getBeforePrev()
            .then(async (el) => {
                const titleEmbed = new EmbedBuilder()
                .setColor(0x009c3f)             
                .setTitle('**Before Previous Stock:**')

                const embedData = 
                    el.map(el => {
                        return new EmbedBuilder()
                        .setColor(0x009c3f)
                        .setTitle(`${el.name}`)
                        .setDescription(`$${el.price}`)
                        .setThumbnail(imageSelect(`${el.name}`))
                    })
                

                i.channel.send({embeds: [titleEmbed]})
                i.channel.send({embeds: embedData})
            })
            
        } catch (err) {
            console.error(err)
        }
    }
    
    
})

client.login(process.env.TOKEN)


