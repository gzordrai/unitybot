import { EmbedBuilder, ModalSubmitFields, ModalSubmitInteraction } from "discord.js";
import { Database, User } from "../database";

export const handleModal = async (interaction: ModalSubmitInteraction, user: User): Promise<void> => {
    switch (interaction.customId) {
        case "presentation": presentationModal(interaction, user); break;
    }
}

const presentationModal = async (interaction: ModalSubmitInteraction, user: User): Promise<void> => {
    const fields: ModalSubmitFields = interaction.fields;
    const embed: EmbedBuilder = new EmbedBuilder();

    embed.setColor("Blue");
    embed.setThumbnail(interaction.user.displayAvatarURL());
    embed.setTitle(`Présentation de ${interaction.user.username}`);
    embed.addFields(
        { name: "Métier et études:", value: fields.getTextInputValue("job") },
        { name: "Qui êtes vous:", value: fields.getTextInputValue("presentation") },
        { name: "XP Unity :", value: fields.getTextInputValue("experience") },
        { name: "But sur le discord :", value: fields.getTextInputValue("goal") }
    );

    user.setPresentationStatus(true);
    await Database.save(user);

    await interaction.followUp({ embeds: [embed] });
}