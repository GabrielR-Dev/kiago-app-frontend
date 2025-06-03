import { Component, OnInit } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar, IonContent } from "@ionic/angular/standalone";

@Component({
    standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
