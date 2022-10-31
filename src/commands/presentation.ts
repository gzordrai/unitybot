import { ActionRowBuilder, CommandInteraction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("presentation")
        .setDescription("Le dépot git du bot"),
    async execute(client: ExtendedClient, interaction: CommandInteraction): Promise<void> {
        const modal: ModalBuilder = new ModalBuilder()
            .setCustomId("presentation")
            .setTitle("Votre présentation");

        const job: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
            new TextInputBuilder()
                .setCustomId("job")
                .setLabel("Quel est votre metier et/ou vos études ?")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
        );

        const presentation: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
            new TextInputBuilder()
                .setCustomId("presentation")
                .setLabel("Une présentation de vous")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
        );

        const xp: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
            new TextInputBuilder()
                .setCustomId("xp")
                .setLabel("Quelle est votre experience sur Unity ?")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
        );

        const goal: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
            new TextInputBuilder()
                .setCustomId("goal")
                .setLabel("Quel est votre but sur le discord ?")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
        );

        modal.addComponents(job, presentation, xp, goal);
        await interaction.showModal(modal);
    }
}

export default command;