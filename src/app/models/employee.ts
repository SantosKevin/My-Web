
export class Employee {

    name: string;
    lastName: string;
    description: string;
    image: string;
    linkedin: string;

    constructor(name?: string, lastName?: string, description?: string, image?: string, linkedin?: string) {
        this.name = name;
        this.lastName = lastName;
        this.description = description;
        this.image = image;
        this.linkedin = linkedin;
    }


}
