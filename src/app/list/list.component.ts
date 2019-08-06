import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // BASE_URL:string= "https://randomuser.me/api/?inc=gender,name,picture,email,phone,registered&results=20&nat=fr";
  contacts;
  contactsfav;
  contactsfound;

  constructor(
    private contactService:ContactService
    ) {

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
            console.log(this.contacts);
          }
    );

    // this.http.get(this.BASE_URL).subscribe(
    //   data => {
    //     this.contacts = data['results'];
    //     for (var i = 0; i < this.contacts.length; i++) {
    //         this.contacts[i].favori = false;
    //     }
    //     this.contactsfound = [...this.contacts];
    //     this.contactsfav = [...this.contacts];
    //     this.contactsfav = this.contactsfav.filter(contact => contact.favori==true);
    //     console.log(this.contacts);
    //   }
    // )

    // this.contacts=[
    //   {name:"Jessica", number:"0666666666", favori:false, dateAjout:"01/10/2010", photo:"https://i2.wp.com/www.lecoindunet.com/wp-content/uploads/2018/10/contact_android.png?fit=300%2C300&ssl=1"},
    //   {name:"Aurelien", number:"0777777777", favori:false, dateAjout:"02/25/1998", photo:"https://i2.wp.com/www.lecoindunet.com/wp-content/uploads/2018/10/contact_android.png?fit=300%2C300&ssl=1"},
    //   {name:"Maman", number:"0888888888", favori:false, dateAjout:"05/11/2018", photo:"https://i2.wp.com/www.lecoindunet.com/wp-content/uploads/2018/10/contact_android.png?fit=300%2C300&ssl=1"}
    // ]
  }

  ngOnChanges(changes: SimpleChanges){
    this.contactsfav = this.contactsfav.filter(contact => contact.favori==true);
  }

  ajouterContact(){

  }

  favoriContact(index:number){
    this.contacts[index].favori = !this.contacts[index].favori;
    this.contactsfav = this.contacts.filter(contact => contact.favori==true);
  }

  favoriContactFromFav(index:number){
    this.contactsfav[index].favori = !this.contactsfav[index].favori;
    this.contactsfav = this.contacts.filter(contact => contact.favori==true);
  }

  supprimerContact(index:number){
    this.contacts.splice(index,1);
    this.contactsfound = [...this.contacts];
    this.contactsfav = this.contacts.filter(contact => contact.favori==true);
  }

  searchContact(event){
    let search = this.contacts.filter(function(contact){
      return contact.name.last.toLowerCase().includes(event.target.value.toLowerCase())||contact.name.first.toLowerCase().includes(event.target.value.toLowerCase());
    });
    console.log(search);
    this.contactsfound = search;
  }

}
