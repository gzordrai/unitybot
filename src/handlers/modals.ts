import { EmbedBuilder, ModalSubmitFields, ModalSubmitInteraction } from "discord.js";
import { ExtendedClient } from "../bot";

export const handleModal = async (client: ExtendedClient, interaction: ModalSubmitInteraction): Promise<void> => {
    await interaction.deferReply();

    switch(interaction.customId) {
        case "presentation": presentationModal(client, interaction); break;
    }
}

const presentationModal = async (client: ExtendedClient, interaction: ModalSubmitInteraction): Promise<void> => {
    const fields: ModalSubmitFields = interaction.fields;
    const embed: EmbedBuilder = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Présentation de ${interaction.user.username}`)
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields(
            { name : "Métier et études:", value: fields.getTextInputValue("job") },
            { name : "Qui êtes vous:", value: fields.getTextInputValue("presentation") },
            { name : "XP Unity :", value: fields.getTextInputValue("xp") },
            { name : "But sur le discord :", value: fields.getTextInputValue("goal") }
        );

    await client.database.push(`/${interaction.user.id}/presentation`, true);
    await interaction.followUp({ embeds: [embed] });
}