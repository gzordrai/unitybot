import { Events, Interaction, Role } from "discord.js";
import { User } from "../models";
import { ExtendedClient, Event, Command } from "../bot";
import { handleButton, handleModal } from "../handlers";

const event: Event = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        const userId: string = interaction.user.id;

        if (interaction.isButton()) {
            console.log(`Button => ${((Date.now() - interaction.createdAt.getTime()) / 1000)}`);
            await interaction.deferReply({ ephemeral: true });
        } else if (interaction.isModalSubmit()) {
            console.log(`Modal => ${((Date.now() - interaction.createdAt.getTime()) / 1000)}`);
            await interaction.deferReply({ ephemeral: false });
        } else if (interaction.isChatInputCommand()) {
        const command: Command = client.commands.get(interaction.commandName)!;

            if (!command.modal)
                await interaction.deferReply({ ephemeral: command.ephemeral });

            try {
                await command.execute(interaction);
            } catch (error) {
                console.log(error);
                await interaction.followUp({ content: "Une erreur inattendue s'est produite lors de l'éxecution de la commande", ephemeral: true });
            }
        }

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
                }

                if (user.isEligible()) {
                    const role: Role = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE_ID!)!;

                    await interaction.member?.roles.add(role);
                    client.pendingUsers.delete(userId);
                }
            } catch (err: unknown) {
                console.log(err);
            }
        }
    },
};

export default event;