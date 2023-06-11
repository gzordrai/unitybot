import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("git")
        .setDescription("Le dépot github du bot"),
    ephemeral: true,
    modal: false,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const embed: EmbedBuilder = new EmbedBuilder();

        embed.setColor("Blue");
        embed.setTitle(interaction.client.user.username);
        embed.setURL("https://github.com/gzordrai/UnityBot");

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;