import { Interface } from "readline";

export interface IUser {
    name: string,
    lastName: string,
    email: string,
    photoUrl?: string,
    emailVerified?: boolean,
    id: string,
}

export class User {
    constructor(
        public email: string,
        public id: string,
        private _token?: string,
        private _tokenExpirationDate?: Date,
        private name?: string,
        private lastName?: string,
        private emailVerified?: boolean,
    ) { }

    get Token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

}