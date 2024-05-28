import { BaseEvent, Event } from "azuria";
import { ButtonInteraction, CommandInteraction, EmbedBuilder, GuildMember, Interaction, ModalSubmitInteraction, Role, Snowflake } from "discord.js";
import { BotConfig } from "../config";

@Event("interactionCreate")
export class InteractionCreate extends BaseEvent<BotConfig> {
    public async execute(interaction: Interaction) {
        if (interaction.inCachedGuild()) {
            try {
                if (interaction.isCommand()) {
                    await this.handleCommand(interaction);
                } else if (interaction.isButton()) {
                    await interaction.deferReply({ ephemeral: true });
                    await this.handleButton(interaction);
                } else if (interaction.isModalSubmit()) {
                    console.log("Modal submit");
                    await interaction.deferReply({ ephemeral: false });
                    await this.handleModalSubmit(interaction);
                }
            } catch (error) {
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

        if (memberRoles.includes(roleId))
            member.roles.remove(roleId);
        else
            member.roles.add(roleId);

        await interaction.followUp({ content: "Vos rôles ont été mis à jour" });
    }

    private async handleModalSubmit(interaction: ModalSubmitInteraction<"cached">): Promise<void> {
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

        await interaction.followUp({ embeds: [embed] });
    }
}