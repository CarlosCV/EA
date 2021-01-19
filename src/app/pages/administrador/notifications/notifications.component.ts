import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../../services/general.service'
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private generalService : GeneralService) { }

  ngOnInit(): void {
   
  }

}
