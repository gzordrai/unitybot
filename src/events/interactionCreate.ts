import { Events, Interaction } from "discord.js";
import { IUser } from "../database";
import { ExtendedClient, IEvent } from "../bot";
import { handleButton, handleModal, handleSlashCommand } from "../handlers";

const event: IEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        if(!(await client.database.exist(`/${interaction.user.id}`))) {
            const user: IUser = { role: false, presentation: false };
            await client.database.push(`/${interaction.user.id}`, user);
        }

        if(interaction.isButton())
            await handleButton(client, interaction);
        else if(interaction.isCommand())
            await handleSlashCommand(client, interaction);
        else if(interaction.isContextMenuCommand())
            console.log("Menu !");
        else if(interaction.isModalSubmit())
            await handleModal(client, interaction);
    },
};

export default event;