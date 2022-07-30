import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { map } from 'rxjs';
import { userResponseModel } from '../models/userResponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  guardarUser( user: UserModel) {
    //console.log("user " + user.name);
    const userData = {
      "name": user.name,
  "email": user.email,
  "password": "Wdfgyuji7",
  "phones": [
    {
      "id": 0,
      "number": "44106104",
      "citycode": "9",
      "countrycode": "56"
    }
  ]
    }
    console.log("userData " + userData);
    return this.http.post<userResponseModel>(`${this.url}`,userData,
            {
              headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                })
            }).pipe(
              map((resp:userResponseModel) => {
                console.log("response " , resp.id);
                return resp;
              }))
  }
}
