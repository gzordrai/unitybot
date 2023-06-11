import { Client, Collection } from "discord.js";
import { Command } from "./Command";
import { User } from "../models";

export class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection<string, Command>();
    public pendingUsers: Collection<string, User> = new Collection<string, User>();
}