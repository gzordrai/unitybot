import { ButtonInteraction, GuildMemberRoleManager, Role } from "discord.js";

export const handleButton = async (interaction: ButtonInteraction<"cached">): Promise<void> => {
    if (interaction.customId.startsWith("role-"))
        await roleButton(interaction);
}

const roleButton = async (interaction: ButtonInteraction<"cached">): Promise<void> => {
    const roleId: string = interaction.customId.split('-')[1];
    const role: Role = interaction.guild!.roles.cache.get(roleId)!;
    const userRoles: GuildMemberRoleManager = interaction.member.roles;

    if (!userRoles.cache.get(role.id))
        await userRoles.add(role);
    else
        await userRoles.remove(role);

    await interaction.editReply({ content: "Vos rôles ont été mis à jour !" });
}