import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/signupinfo";
import { Hospital } from "../model/signupinfo";
import { Organization } from "../model/signupinfo";

@Injectable({providedIn: "root"})
export class LoginService{
    constructor(private http: HttpClient){}

    login(email: string, password: string){
        
    }
}