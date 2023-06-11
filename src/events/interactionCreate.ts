import { Events, Interaction, Role } from "discord.js";
import { User } from "../models";
import { ExtendedClient, Event, Command } from "../bot";
import { handleButton, handleModal, handleSlashCommand } from "../handlers";

const event: Event = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        const userId: string = interaction.user.id;

        if (interaction.isChatInputCommand()) {
            const command: Command = client.commands.get(interaction.commandName)!;

                if (!command.modal)
                    await interaction.deferReply({ ephemeral: command.ephemeral });
        } else if (interaction.isButton())
            await interaction.deferReply({ ephemeral: true });
        else if (interaction.isModalSubmit())
            await interaction.deferReply({ ephemeral: false });

        if (!client.pendingUsers.has(interaction.user.id))
            client.pendingUsers.set(userId, new User(userId));

        const user: User = client.pendingUsers.get(userId)!;

        if (interaction.inCachedGuild()) {
            try {
                if (interaction.isButton()) {
                    await handleButton(interaction);
    
                    user.setRoleStatus(true);
                } else if (interaction.isModalSubmit()) {
                    await handleModal(interaction);
    
                    user.setPresentationStatus(true);
                } else if (interaction.isChatInputCommand())
                    await handleSlashCommand(client, interaction);
    
                if (user.isEligible()) {
                    const role: Role = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE_ID!)!;
    
                    interaction.member?.roles.add(role);
                    client.pendingUsers.delete(userId);
                }
            } catch (err: unknown) {
                console.log(err);
            }
        }
    },
};

export default event;