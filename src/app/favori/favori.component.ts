import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-favori',
  templateUrl: './favori.component.html',
  styleUrls: ['./favori.component.css']
})
export class FavoriComponent implements OnInit {
  contactsfav;
  contacts;

  constructor( private contactService:ContactService) { }

  ngOnInit() {
    this.contactService.contactsFavoriSubject.subscribe(
      data => this.contactsfav=data
    )
    this.contactService.contactSubject.subscribe(
      data => this.contacts=data
    )
    console.log(this.contactsfav);
  }

  // favoriContact(contact){
  //   this.contacts[index].favori = !this.contacts[index].favori;
  //   this.contactsfav = this.contacts.filter(contact => contact.favori==true);
  // }

  favoriContactFromFav(index){
    this.contactsfav[index].favori = !this.contactsfav[index].favori;
    this.contactsfav = this.contactsfav.filter(contact => contact.favori==true);
    
    this.contactService.contactsFavoriSubject.next(this.contactsfav);
  }

  showDetailsAction(contact){
    this.contactService.contactSubject.next(contact);
    // this.router.navigate(['/details', contact]);
  }
}
