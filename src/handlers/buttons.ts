import { ButtonInteraction, GuildMemberRoleManager, Role } from "discord.js";
import { ExtendedClient } from "../bot";

export const handleButton = async (client: ExtendedClient, interaction: ButtonInteraction): Promise<void> => {
    if (interaction.customId.startsWith("role-"))
        roleButton(client, interaction);
}

const roleButton = async (client: ExtendedClient, interaction: ButtonInteraction): Promise<void> => {
    let message: string = '-';

    await interaction.deferReply({ ephemeral: true });

    if (interaction.inCachedGuild()) {
        const roleId: string = interaction.customId.split('-')[1];
        const role: Role = interaction.guild!.roles.cache.get(roleId)!;
        const userRoles: GuildMemberRoleManager = interaction.member.roles;

        message = `Le rôle ${role.name}`;

        if (!userRoles.cache.get(role.id)) {
            userRoles.add(role);
            message += " a été ajouté avec succès !";
        } else {
            userRoles.remove(role);
            message += " a été supprimé avec succès !";
        }

        client.database.push(`/${interaction.user.id}/role`, true);
    }

    await interaction.editReply({ content: message });
}