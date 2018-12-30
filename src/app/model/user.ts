export class User {
    name: string;
    color: string;
    allowed: boolean = true;

    constructor(_name: string) {
        this.name = _name;
        this.color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
    }
}
 