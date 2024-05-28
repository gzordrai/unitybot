import { BaseCommand, Command } from "azuria";
import { BotConfig } from "../../config";
import { ActionRowBuilder, CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

@Command({
    name: "presentation",
    description: "Présentez-vous auprès de la communauté"
})
export class Presentation extends BaseCommand<BotConfig> {
    public readonly modal: boolean = true;

    public async execute(interaction: CommandInteraction<"cached">): Promise<void> {
        const modal: ModalBuilder = new ModalBuilder()
        const job: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>();
        const presentation: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>();
        const experience: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>();
        const goal: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>();

        job.addComponents(
            new TextInputBuilder()
                .setCustomId("job")
                .setLabel("Quel est votre metier et/ou vos études ?")
                .setMinLength(5)
                .setMaxLength(1024)
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
        );

        presentation.addComponents(
            new TextInputBuilder()
                .setCustomId("presentation")
                .setLabel("Une présentation de vous")
                .setMaxLength(1024)
                .setMinLength(30)
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
        );

        experience.addComponents(
            new TextInputBuilder()
                .setCustomId("experience")
                .setLabel("Quelle est votre expérience sur Unity ?")
                .setMaxLength(1024)
                .setMinLength(1)
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
        );

        goal.addComponents(
            new TextInputBuilder()
                .setCustomId("goal")
                .setLabel("Quelle est votre but sur le discord ?")
                .setMaxLength(1024)
                .setMinLength(1)
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
        );

        modal.setCustomId("presentation");
        modal.setTitle("Votre présentation");
        modal.addComponents(job, presentation, experience, goal);

        await interaction.showModal(modal);
    }
}