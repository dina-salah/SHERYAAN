import { AsyncKeyword } from "typescript";

export class reqAdd{
    request_status:string;
    user_Fname:string;
    user_Lname:string;
    hospital_name:string;
    request_date:Date;
    blood_type:string;
    request_quantity:string;
    request_case:string;
    city:string;
    hospital_city: string;
    hospital_address:string;
    request_id: number;
    Requests_Counter: number;
    isEditing: any;
}
export class City{
    location_code:any;
    city:string;
}

export class Response{
    applicant_Fname: string;
    applicant_Lname: string;
    applicant_ID: number;
    request_date: Date;
    blood_type: string;
    request_quantity: number;
    response_date: Date;
    response_status: number;
    participant_ID: number;
    participant_Fname: string;
    participant_Lname: string;
    request_id:string;
}