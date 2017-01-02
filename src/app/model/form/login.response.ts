import { User } from 'app/model/user';
export class LoginResponse {
    constructor(
        public cookieXSRF: string, 
        public cookie: string,
        public user:User
    ){}
}