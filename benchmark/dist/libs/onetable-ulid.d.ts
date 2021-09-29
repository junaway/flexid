export default class ULID {
    static decode(ulid: any): any;
    static getRandom(): string;
    static getTime(now: any): string;
    constructor(when: any);
    when: Date;
    toString(): any;
}
