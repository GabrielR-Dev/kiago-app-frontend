import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent  implements OnInit {
  @Input() control!: FormControl;
  @Input() type!: String;
  @Input() label!: String;
  @Input() autocomplete!: String;
  @Input() icon!: String;

isPassword!:boolean;
hide:boolean=true;

  constructor() { 
  }

  ngOnInit() { if (this.type=="password") this.isPassword=true;}
 
  showOrHidePassword(){
    this.hide=!this.hide;
    if (this.hide) this.type="password";
    else this.type="text"
  }
}
