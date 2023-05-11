import { Events, Interaction, Role } from "discord.js";
import { Database, User } from "../database";
import { ExtendedClient, Event, Command } from "../bot";
import { handleButton, handleModal, handleSlashCommand } from "../handlers";

const event: Event = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        const userId: string = interaction.user.id;
        let user: User;

        if (interaction.isButton()) {
            let enterPoint = (Date.now() - interaction.createdAt.getTime()) / 1000;
            console.log(`[${new Date()}] Button by ${interaction.user.username}, enter point: ` + enterPoint);

            try {
                await interaction.deferReply({ ephemeral: true });
            } catch (err) {
                console.log(err);
            }

            console.log(`[${new Date()}] Button by ${interaction.user.username}, total time: ` + (((Date.now() - interaction.createdAt.getTime()) / 1000) - enterPoint));
        } else if (interaction.isModalSubmit()) {
            let enterPoint = (Date.now() - interaction.createdAt.getTime()) / 1000;
            console.log(`[${new Date()}] Modal submit by ${interaction.user.username}, enter point: ` + enterPoint);
    
            try {
                await interaction.deferReply();
            } catch (err) {
                console.log(err);
            }

            console.log(`[${new Date()}] Modal submit by ${interaction.user.username}, total time: ` + (((Date.now() - interaction.createdAt.getTime()) / 1000) - enterPoint));
        } else if (interaction.isChatInputCommand()) {
            const command: Command = client.commands.get(interaction.commandName)!;

            if (!command.modal) {
                console.log(`Command by ${interaction.user.username}: ` + (Date.now() - interaction.createdAt.getTime()) / 1000);
                await interaction.deferReply();
            }

            await handleSlashCommand(client, interaction);
        }

        if (interaction.inCachedGuild()) {
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
        }
    },
};

export default event;