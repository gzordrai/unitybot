import { JSONUser } from "./JSON";

export class User {
    private id: string;
    private presentation: boolean;
    private role: boolean;

    public constructor(id: string, presentation: boolean = false, role: boolean = false) {
        this.id = id;
        this.presentation = presentation;
        this.role = role;
    }

    /**
     * The id of the user
     * 
     * @returns user id
     */
    public getId(): string {
        return this.id;
    }

    /**
     * The status of the user presentation
     * 
     * @returns true if the user made his presentation otherwise false
     */
    public getPresentationStatus(): boolean {
        return this.presentation;
    }

    /**
     * The status of the user on assignment of a role
     * 
     * @returns true if the user has added a role otherwise false
     */
    public getRoleStatus(): boolean {
        return this.role;
    }

    /**
     * Check if the user is eligible to have access to the rest of the server
     * 
     * @returns true if the user made his presentation and added a role otherwise false
     */
    public isEligible(): boolean {
        if (this.presentation && this.role)
            return true;
        return false;
    }

    /**
     * The data of the user intended to be stored in a .json
     * 
     * @returns user data
     */
    public toJSON(): JSONUser {
        return { presentation: this.presentation, role: this.role };
    }
}