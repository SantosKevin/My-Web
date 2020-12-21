export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;

    constructor(id?: number, username?: string, password?: string, email?: string, name?: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
    }
}
