import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonTitle, IonHeader, IonToolbar } from "@ionic/angular/standalone";


@Component({
  standalone:false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
@Input() title!:string
  constructor() { }

  ngOnInit() {}

}
