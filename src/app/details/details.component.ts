import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  contact;

  constructor(private contactService:ContactService) { }

  ngOnInit() {
    this.contactService.contactSubject.subscribe(
      data => this.contact=data
    )
  }

  hide(){
    this.contact ='';
    this.contactService.isVisible.next(true);
  }

}
