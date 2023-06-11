import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Information sur la latence du bot"),
    ephemeral: true,
    modal: false,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const embed: EmbedBuilder = new EmbedBuilder();

        embed.setColor("Blue");
        embed.setTitle(`Roundtrip latency: ${Date.now() - interaction.createdTimestamp}ms`);

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;