import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  BASE_URL:string= "https://randomuser.me/api/?inc=gender,name,picture,email,phone,registered&results=20&nat=fr&seed=1fb377d70a2717d2";
  contactSubject = new Subject();
  contactsFavoriSubject = new Subject();
  isVisible = new Subject();

  constructor(private http:HttpClient) { }

  getContacts(){
    return this.http.get(this.BASE_URL);
  }

}
