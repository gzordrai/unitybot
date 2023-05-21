import { Config, JsonDB } from "node-json-db";
import path from "path";
import { JSONUser } from "./JSON";
import { User } from "./User";

export class Database {
    private static users: JsonDB = new JsonDB(new Config(path.resolve(__dirname, "../../data/users.json"), true, true, '/'));

    /**
     * Add a new user to the database
     * 
     * @param id user id
     * @returns added user
     */
    public static async addUser(id: string): Promise<User> {
        const user: User = new User(id);

        await Database.save(user);

        return user;
    }

    /**
     * Retrieves user data from the database
     * 
     * @param id user id
     * @returns user data
     */
    public static async getUser(id: string): Promise<User> {
        const data: JSONUser = await this.users.getData(`/${id}`);

        return new User(id, data.presentation, data.role);
    }

    /**
     * Check if the user is in the database
     * 
     * @param id user id
     * @returns true if the user has an account in the database otherwise false
     */
    public static async has(id: string): Promise<boolean> {
        if (await this.users.exists(`/${id}`))
            return true;
        return false;
    }

    /**
     * Save a user in the database
     * 
     * @param user user to be save
     */
    public static async save(user: User): Promise<void> {
        await this.users.push(`/${user.getId()}`, user.toJSON(), true);
    }
}