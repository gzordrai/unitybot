import { Client, Message } from "discord.js";

export default (client: Client): void => {
    client.on("messageCreate", async (message: Message) => {
        const time: number = 10000;

        if(message.channel.id === process.env.PRESENTATION_CHANNEL_ID) {
            if(!message.author.bot) {
                message.reply({ content: `Merci d'utiliser la commande \`/presentation\`, votre message sera supprimé dans ${time * 0.001}s !` })
                .then((msg: Message) => {
                    setTimeout(() => {
                        message.delete();
                        msg.delete();
                    }, time);
                })
            }
        }
    });
}; 