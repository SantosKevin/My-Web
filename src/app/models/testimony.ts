import { Country } from "./country";

export class Testimony {

    idTestimony: number;
    fullName: string;
    commentary: string;
    profile: string;
    country: Country;
    datePosted: Date;

    constructor(fullName?: string, commentary?: string, profile?: string, country?: Country, datePosted?: Date){
        this.fullName = fullName;
        this.commentary = commentary;
        this.profile = profile;
        this.country = country;
        this.datePosted = datePosted;
    }
}
