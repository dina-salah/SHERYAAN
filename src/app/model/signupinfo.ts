export class User{user_Fname: string;
    user_id: any;
    user_Lname: string;
    user_national_ID: string;
    user_gender: string;
    user_age: number;
    user_address: string;
    user_phoneNo: string;
    user_Email: string;
    city: any;
    user_blood_type: string;
    user_health_status: string;
    user_password: string;
    location_code:any;
}

export class Hospital{
    hospital_id: any;
    hospital_name!: string;
    hospital_address!: string;
    hospital_phoneNo!: string;
    hospital_Email!: string;
    city!: string;
    hospital_password!: string;
    location_code:any;
}

export class Organization{
    organization_id!: number;
    organization_name!: string;
    organization_password!: string;
    organization_phoneNo!: string;
    organization_email!: string;
    orgaization_city!: string;
    location_code:any;
}