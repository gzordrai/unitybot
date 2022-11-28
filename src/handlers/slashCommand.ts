import { ChatInputCommandInteraction } from "discord.js";
import { ExtendedClient, Command } from "../bot";

const modalCommands: Array<string> = ["presentation"];

export const handleSlashCommand = async (client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> => {
    const command: Command = client.commands.get(interaction.commandName)!;

    try {
        if (!modalCommands.includes(interaction.commandName)) {
            await interaction.deferReply();
            await command.execute(interaction);
        } else
            await command.execute(interaction);
    } catch (error) {
        console.log(error)
        await interaction.reply({ content: "Une erreur inattendue s'est produite lors de l'éxecution de la commande", ephemeral: true });
    }
}