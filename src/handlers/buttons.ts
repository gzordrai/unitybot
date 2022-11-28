import { ButtonInteraction, GuildMemberRoleManager, Role } from "discord.js";
import { Database, User } from "../database";

export const handleButton = async (interaction: ButtonInteraction, user: User): Promise<void> => {
    if (interaction.customId.startsWith("role-"))
        roleButton(interaction, user);
}

const roleButton = async (interaction: ButtonInteraction, user: User): Promise<void> => {
    await interaction.deferReply({ ephemeral: true });

    if (interaction.inCachedGuild()) {
        const roleId: string = interaction.customId.split('-')[1];
        const role: Role = interaction.guild!.roles.cache.get(roleId)!;
        const userRoles: GuildMemberRoleManager = interaction.member.roles;

        if (!userRoles.cache.get(role.id))
            userRoles.add(role);
        else
            userRoles.remove(role);

        user.setRoleStatus(true)
        Database.save(user);
    }

    await interaction.editReply({ content: "Vos rôles ont été mis à jour !" });
}