import { ButtonInteraction, Events, Interaction, ModalSubmitInteraction, Role } from "discord.js";
import { Database, User } from "../database";
import { ExtendedClient, Event, Command } from "../bot";
import { handleButton, handleModal, handleSlashCommand } from "../handlers";

const event: Event = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        const userId: string = interaction.user.id;
        let user: User;

        if (interaction.inCachedGuild()) {
            if (!interaction.isChatInputCommand()) {
                if (interaction.isButton())
                    await interaction.deferReply({ ephemeral: true });
                else if (interaction.isModalSubmit())
                    await interaction.deferReply();

                if (await Database.has(userId))
                    user = await Database.getUser(userId);
                else
                    user = await Database.addUser(userId);

                if (interaction.isButton())
                    await handleButton(interaction, user);
                else if (interaction.isModalSubmit())
                    await handleModal(interaction, user);

                if ((await Database.getUser(userId)).isEligible()) {
                    const role: Role = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE_ID!)!;
                    await interaction.member?.roles.add(role);
                }
            } else {
                const command: Command = client.commands.get(interaction.commandName)!;

                if (!command.modal)
                    await interaction.deferReply();

                await handleSlashCommand(client, interaction);
            }
        }
    },
};

export default event;