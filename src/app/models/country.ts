export class Country {

    name: string;
    alpha2Code: string;
    alpha3Code: string;

    constructor(name?: string, alpha2Code?: string, alpha3Code?: string){
        this.name = name;
        this.alpha2Code = alpha2Code;
        this.alpha3Code = alpha3Code;
    }
}
