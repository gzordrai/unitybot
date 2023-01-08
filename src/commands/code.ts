import { APIInteractionDataResolvedGuildMember, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from "discord.js";
import { Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("code")
        .setDescription("Comment encapsuler son code")
        .addUserOption(option =>
            option.setName("cible")
                .setDescription("L'utilisateur concerné par le conseil")
                .setRequired(false)
        ),
    modal: false,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const user: GuildMember | APIInteractionDataResolvedGuildMember | null = interaction.options.getMember("cible")
        let ret: string = "***Conseil pour partager son code:***\n";

        if (user)
            ret += `Suggestions pour: ${user}\n`;

        ret += `> \\\`\`\`cs\n> Votre code...\n> \`\`\``;

        await interaction.followUp({ content: ret });
    }
}

export default command;