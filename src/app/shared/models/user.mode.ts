export class User {
    constructor(
        public name: string,
        public role: string,
        public password?: string,
        public _id?: string,
        public datecreated?: number,
        public modified? : number
    ) {}
}
