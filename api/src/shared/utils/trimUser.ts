import type { UserInRes } from "../interfaces/user.interface";

class TrimUser implements UserInRes {
    public id: string;
    public email: string;
    public name: string;
    public token: string;

    constructor (user: UserInRes) {
        this.id = user.id
        this.email = user.email
        this.name = user.name
        this.token = user.token
    }
}

export default TrimUser