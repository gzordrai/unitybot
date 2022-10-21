import { Client, Message } from "discord.js";

export default (client: Client): void => {
    client.on("messageCreate", async (message: Message) => {
        if(message.channel.id === process.env.PRESENTATION_CHANNEL_ID) {
            if(!message.author.bot) {
                message.reply({ content: "Merci d'utiliser la commande `/presentation`" })
                .then((msg: Message) => {
                    setTimeout(() => {
                        message.delete();
                        msg.delete();
                    }, 5000)
                })
            }
        }
    });
}; 