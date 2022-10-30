import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("git")
        .setDescription("Le dépot git du bot"),
    async execute(client: ExtendedClient, interaction: CommandInteraction): Promise<void> {
        const avatarURL: string = interaction.guild?.members.cache.get(process.env.OWNER_ID!)?.displayAvatarURL()!;
        const embed: EmbedBuilder = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("UnityBot")
            .setURL("https://github.com/gzordrai/UnityBot")
            .setAuthor({ name: "gzordrai", iconURL: avatarURL, url: "https://github.com/gzordrai" })

        await interaction.followUp({
            ephemeral: true,
            embeds: [embed]
        });
    }
}

export default command;