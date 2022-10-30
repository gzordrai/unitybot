import { Events, Message } from "discord.js";
import { ExtendedClient, IEvent } from "src/bot";

const event: IEvent = {
    name: Events.MessageCreate,
    once: false,
    async execute(client: ExtendedClient, message: Message): Promise<void> {
        const time: number = 10000;

        if(message.channelId === process.env.PRESENTATION_CHANNEL_ID!) {
            if(!message.author.bot) {
                message.reply({ content: `Merci de bien vouloir utiliser la commade \`/presentation\`, si la commande n'est pas disponible / ne fonctionne pas merci d'envoyer un message à <@${process.env.OWNER_ID!}>` });
                client.logger.warn(`Message sent instead of an interaction, Author: ${message.author.username} - Id: ${message.author.id}`);
            }
        }
    },
};

export default event;