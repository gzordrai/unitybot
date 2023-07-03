import { Client, Collection } from "discord.js";
import { Command } from "./Command";
import { User } from "../models";
import path from "path";
import { readdirSync } from "fs";
import { Event } from "./Event";

export class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection<string, Command>();
    public pendingUsers: Collection<string, User> = new Collection<string, User>();

    public async loadCommands(): Promise<void> {
        const commandsPath = path.join(__dirname, "../commands");
        const commandFiles: Array<string> = readdirSync(commandsPath).filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            const filePath: string = path.join(commandsPath, file);
            const { default: command } = await import(filePath) as { default: Command };
    
            this.commands.set(command.data.name, command);
        }
    }

    public async loadEvents(): Promise<void> {
        const eventsPath: string = path.join(__dirname, "../events");
        const eventFiles: Array<string> = readdirSync(eventsPath).filter(file => file.endsWith(".js"));

        for (const file of eventFiles) {
            const filePath: string = path.join(eventsPath, file);
            const { default: event } = await import(filePath) as { default: Event };
        
            if (event.once)
                this.once(event.name, (...args) => event.execute(this, ...args));
            else
            this.on(event.name, (...args) => event.execute(this, ...args));
        }
    }
}