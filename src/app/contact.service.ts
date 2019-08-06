import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  BASE_URL:string= "https://randomuser.me/api/?inc=gender,name,picture,email,phone,registered&results=20&nat=fr";
  
  constructor(private http:HttpClient) { }

  getContacts(){
    return this.http.get(this.BASE_URL);
  }

  getFavoris(){

  }
}
