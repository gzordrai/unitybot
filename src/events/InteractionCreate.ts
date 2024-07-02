import { ButtonInteraction, Collection, CommandInteraction, EmbedBuilder, GuildMember, Interaction, ModalSubmitInteraction, Role, Snowflake } from "discord.js";
import { BaseEvent, Event } from "azuria";
import { BotConfig } from "@/config";
import { User } from "@/types";

@Event("interactionCreate")
export class InteractionCreate extends BaseEvent<BotConfig> {
    private readonly users: Collection<Snowflake, User> = new Collection();

    public async execute(interaction: Interaction): Promise<void> {
        if (interaction.inCachedGuild()) {
            try {
                if (!this.users.has(interaction.user.id))
                    this.users.set(interaction.user.id, { role: false, presentation: false });

                if (interaction.isCommand()) {
                    await this.handleCommand(interaction);
                } else if (interaction.isButton()) {
                    await interaction.deferReply({ ephemeral: true });
                    await this.handleButton(interaction);
                } else if (interaction.isModalSubmit())
                    await this.handleModalSubmit(interaction);

                const user = this.users.get(interaction.user.id);

                if (user?.role && user?.presentation) {
                    const roleId: Snowflake | undefined = this.client.configs.get(interaction.guildId)?.roles.member;

                    if (roleId)
                        interaction.member.roles.add(roleId);
                }
            } catch (error) {
                console.log(error);
                this.client.logger.error(error);
            }
        }
    }

    private async handleCommand(interaction: CommandInteraction<"cached">): Promise<void> {
        const command = this.client.commands.get(interaction.commandName);

        if (!command)
            throw new Error("Command not found");

        if (!command.modal)
            await interaction.deferReply({ ephemeral: command.ephemeral ?? false });

        command.execute(interaction);
    }

    private async handleButton(interaction: ButtonInteraction<"cached">): Promise<void> {
        const member: GuildMember = interaction.member;

        if (!member)
            throw new Error("Member not found");

        const roleId: string = interaction.customId.split('-')[1]; // Format: "role-<roleId>" (to change for just roleId)
        const memberRoles: Snowflake[] = member.roles.cache.map((role: Role) => role.id);

        if (!memberRoles.includes(roleId)) {
            member.roles.add(roleId);
            this.setFieldToTrue(interaction.user.id, "role");
        } else
            member.roles.remove(roleId);

        await interaction.followUp({ content: "Vos rôles ont été mis à jour" });
    }

    private async handleModalSubmit(interaction: ModalSubmitInteraction<"cached">): Promise<void> {
        const userId: Snowflake = interaction.user.id;
        const fields = interaction.fields;
        const embed: EmbedBuilder = new EmbedBuilder()
            .setColor("Blue")
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTitle(`Présentation de ${interaction.user.username}`)
            .addFields(
                { name: "Métier et études:", value: fields.getTextInputValue("job") },
                { name: "Qui êtes vous:", value: fields.getTextInputValue("presentation") },
                { name: "XP Unity :", value: fields.getTextInputValue("experience") },
                { name: "But sur le discord :", value: fields.getTextInputValue("goal") }
            );

        await interaction.reply({ embeds: [embed] });
        this.setFieldToTrue(userId, "presentation");
    }

    private setFieldToTrue(userId: Snowflake, field: keyof User) {
        const user = this.users.get(userId);

        if (user)
            user[field] = true;
    }
}