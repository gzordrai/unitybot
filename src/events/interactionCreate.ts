import { Events, Interaction, Role } from "discord.js";
import { Database, User } from "../database";
import { ExtendedClient, Event } from "../bot";
import { handleButton, handleModal, handleSlashCommand } from "../handlers";

const event: Event = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        const userId: string = interaction.user.id;
        let user: User;

        if (await Database.has(userId))
            user = await Database.getUser(userId);
        else
            user = await Database.addUser(userId);

        if (interaction.isChatInputCommand()) {
            if (!client.commands.get(interaction.commandName)!.modal)
                await interaction.deferReply();

            await handleSlashCommand(client, interaction);
        } else if (interaction.isButton()) {
            await interaction.deferReply({ ephemeral: true });
            await handleButton(interaction, user);
        } else if (interaction.isModalSubmit()) {
            await interaction.deferReply();
            await handleModal(interaction, user);
        }

        if (interaction.inCachedGuild()) {
            if ((await Database.getUser(userId)).isEligible()) {
                const role: Role = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE_ID!)!;
                await interaction.member?.roles.add(role);
            }
        }
    },
};

export default event;