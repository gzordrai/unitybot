import { CommandInteraction } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";

const modalCommands: Array<string> = ["presentation"];

export const handleSlashCommand = async (client: ExtendedClient, interaction: CommandInteraction): Promise<void> => {
    const command: ICommand = client.commands.get(interaction.commandName)!;

    try {
        if (!modalCommands.includes(interaction.commandName)) {
            await interaction.deferReply();
            client.logger.info(`${interaction.user.username} executed /${interaction.commandName} command`);
            await command.execute(client, interaction);
        } else
            await command.execute(client, interaction);
    } catch (error_: any) {
        const error = error_ as Error;
        client.logger.error(error.message);
        await interaction.reply({ content: "Une erreur inattendue s'est produite lors de l'éxecution de la commande", ephemeral: true });
    }
}