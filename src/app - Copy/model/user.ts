export class User {
    constructor(
        public id: number, 
        public name: string,
        public username: string,
        public status: string,
        public description: string,
        public roles: string[],
    ){}
}