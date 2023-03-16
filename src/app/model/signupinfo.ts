export class User{
    fname: string;
    lname: string;
    ssn: number;
    gender: string;
    age: number;
    address: string;
    phone: string;
    email: string;
    city: string;
    bloodType: string;
    healthstatus: string;
    password: string;
}

export class Hospital{
    hospitalName!: string;
    address!: string;
    phone!: string;
    email!: string;
    city!: string;
}

export class Organization{
    orgnizationName!: string;
    address!: string;
    phone!: string;
    email!: string;
    city!: string;
}