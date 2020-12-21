export class Covid {

    confirmed: number;
    deaths: number;
    recovered: number;
    active: number;
    critical: number;
    country: string;

    constructor(confirmed?: number,  deaths?: number, recovered?: number,active?: number, critical?: number,  country?: string){
        this.confirmed = confirmed;
        this.deaths = deaths;
        this.recovered = recovered;
        this.active = active;
        this.critical = critical;
        this.country = country;
    }
}
