import { EmbedBuilder, ModalSubmitFields, ModalSubmitInteraction } from "discord.js";

export const handleModal = async (interaction: ModalSubmitInteraction): Promise<void> => {
    switch (interaction.customId) {
        case "presentation": await presentationModal(interaction); break;
    }
}

const presentationModal = async (interaction: ModalSubmitInteraction): Promise<void> => {
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

    await interaction.followUp({ embeds: [embed] });
}