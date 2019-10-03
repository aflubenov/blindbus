import { CuandoLlegaService } from './../services/cuandollega';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blindbus';

  constructor(public pServicio:CuandoLlegaService) {

  }

}
