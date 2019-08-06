import { Component, OnInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contacts;
  isVisible:boolean=true;
  contactsfav = [];
  contactsfound = [];

  constructor(private contactService:ContactService) {

   }

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      data => {
          this.contacts = data['results'];
          for (var i = 0; i < this.contacts.length; i++) {
              this.contacts[i].favori = false;
          }
          this.contactsfound = [...this.contacts];
          this.contactsfav = [...this.contacts];
          this.contactsfav = this.contactsfav.filter(contact => contact.favori==true);
          
          this.contactService.contactsFavoriSubject.next(this.contactsfav);
          // console.log(this.contacts);
        }
    )
    this.contactService.isVisible.subscribe( data => {
      if(data === true || data === false){
        this.isVisible = data;
      }
    })
  }

  // ngOnChanges(changes: SimpleChanges){
  //   this.contactsfav = this.contactsfav.filter(contact => contact.favori==true);
  // }

  // ajouterContact(){

  // }

  favoriContact(index:number){
    this.contactsfound[index].favori = !this.contactsfound[index].favori;
    // console.log(this.contactsfound, index);
    this.contactsfav = this.contacts.filter(contact => contact.favori==true);
    
    this.contactService.contactsFavoriSubject.next(this.contactsfav);
  }

  supprimerContact(index:number){
    this.contacts.splice(index,1);
    this.contactsfound = [...this.contacts];
    this.contactsfav = this.contacts.filter(contact => contact.favori==true);

    this.contactService.contactsFavoriSubject.next(this.contactsfav);
  }

  searchContact(event){
    let search = this.contacts.filter(function(contact){
      return contact.name.last.toLowerCase().includes(event.target.value.toLowerCase())||contact.name.first.toLowerCase().includes(event.target.value.toLowerCase());
    })
    this.contactsfound = search;
  }

  showDetailsAction(contact){
    this.isVisible = false;

    this.contactService.contactSubject.next(contact);
    // this.router.navigate(['/details', contact]);
  }

}
