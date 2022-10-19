import { ApplicationCommandType, CommandInteraction, Client, EmbedBuilder } from "discord.js";
import { ICommand } from "../ICommand";

export const test: ICommand = {
    name: "repo",
    description: "Le repo git du bot",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const avatarURL: string = interaction.guild?.members.cache.get(process.env.OWNER_ID!)?.displayAvatarURL()!;
        const embed = new EmbedBuilder()
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