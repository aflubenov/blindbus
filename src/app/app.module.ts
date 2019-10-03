import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GMapComponent } from './g-map/g-map.component';
import { HttpClientModule } from '@angular/common/http';
import { CuandoLlegaService } from 'src/services/cuandollega';

@NgModule({
  declarations: [
    AppComponent,
    GMapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CuandoLlegaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
