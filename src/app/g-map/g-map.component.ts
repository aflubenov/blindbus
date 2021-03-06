import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { paradas, parada } from '../../assets/paradas';
import { CuandoLlegaService } from 'src/services/cuandollega';
import { ThrowStmt } from '@angular/compiler';

interface Coordinates {
  lat: number;
  long: number;
  initialized: boolean;
}

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})
export class GMapComponent implements OnInit, AfterViewInit {

  @ViewChild('theMap', { static: false }) theMap?: ElementRef;
  private map: any;
  private myCoordinates: Coordinates = {
    lat: 0,
    long: 0,
    initialized: false
  };
  private busStopMarkers: { marker: any, listener: any }[] = [];
  private personMarker: { marker: any, image: string } = { marker: null, image: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2223%22%20height%3D%2238%22%20viewBox%3D%220%200%2023%2038%22%3E%0A%3Cpath%20d%3D%22M16.6%2C38.1h-5.5l-0.2-2.9-0.2%2C2.9h-5.5L5%2C25.3l-0.8%2C2a1.53%2C1.53%2C0%2C0%2C1-1.9.9l-1.2-.4a1.58%2C1.58%2C0%2C0%2C1-1-1.9v-0.1c0.3-.9%2C3.1-11.2%2C3.1-11.2a2.66%2C2.66%2C0%2C0%2C1%2C2.3-2l0.6-.5a6.93%2C6.93%2C0%2C0%2C1%2C4.7-12%2C6.8%2C6.8%2C0%2C0%2C1%2C4.9%2C2%2C7%2C7%2C0%2C0%2C1%2C2%2C4.9%2C6.65%2C6.65%2C0%2C0%2C1-2.2%2C5l0.7%2C0.5a2.78%2C2.78%2C0%2C0%2C1%2C2.4%2C2s2.9%2C11.2%2C2.9%2C11.3a1.53%2C1.53%2C0%2C0%2C1-.9%2C1.9l-1.3.4a1.63%2C1.63%2C0%2C0%2C1-1.9-.9l-0.7-1.8-0.1%2C12.7h0Zm-3.6-2h1.7L14.9%2C20.3l1.9-.3%2C2.4%2C6.3%2C0.3-.1c-0.2-.8-0.8-3.2-2.8-10.9a0.63%2C0.63%2C0%2C0%2C0-.6-0.5h-0.6l-1.1-.9h-1.9l-0.3-2a4.83%2C4.83%2C0%2C0%2C0%2C3.5-4.7A4.78%2C4.78%200%200%2C0%2011%202.3H10.8a4.9%2C4.9%2C0%2C0%2C0-1.4%2C9.6l-0.3%2C2h-1.9l-1%2C.9h-0.6a0.74%2C0.74%2C0%2C0%2C0-.6.5c-2%2C7.5-2.7%2C10-3%2C10.9l0.3%2C0.1%2C2.5-6.3%2C1.9%2C0.3%2C0.2%2C15.8h1.6l0.6-8.4a1.52%2C1.52%2C0%2C0%2C1%2C1.5-1.4%2C1.5%2C1.5%2C0%2C0%2C1%2C1.5%2C1.4l0.9%2C8.4h0Zm-10.9-9.6h0Zm17.5-.1h0Z%22%20style%3D%22fill%3A%23333%3Bopacity%3A0.7%3Bisolation%3Aisolate%22%2F%3E%0A%3Cpath%20d%3D%22M5.9%2C13.6l1.1-.9h7.8l1.2%2C0.9%22%20style%3D%22fill%3A%23ce592c%22%2F%3E%0A%3Cellipse%20cx%3D%2210.9%22%20cy%3D%2213.1%22%20rx%3D%222.7%22%20ry%3D%220.3%22%20style%3D%22fill%3A%23ce592c%3Bopacity%3A0.5%3Bisolation%3Aisolate%22%2F%3E%0A%3Cpath%20d%3D%22M20.6%2C26.1l-2.9-11.3a1.71%2C1.71%2C0%2C0%2C0-1.6-1.2H5.7a1.69%2C1.69%2C0%2C0%2C0-1.5%2C1.3l-3.1%2C11.3a0.61%2C0.61%2C0%2C0%2C0%2C.3.7l1.1%2C0.4a0.61%2C0.61%2C0%2C0%2C0%2C.7-0.3l2.7-6.7%2C0.2%2C16.8h3.6l0.6-9.3a0.47%2C0.47%2C0%2C0%2C1%2C.44-0.5h0.06c0.4%2C0%2C.4.2%2C0.5%2C0.5l0.6%2C9.3h3.6L15.7%2C20.3l2.5%2C6.6a0.52%2C0.52%2C0%2C0%2C0%2C.66.31h0l1.2-.4a0.57%2C0.57%2C0%2C0%2C0%2C.5-0.7h0Z%22%20style%3D%22fill%3A%23fdbf2d%22%2F%3E%0A%3Cpath%20d%3D%22M7%2C13.6l3.9%2C6.7%2C3.9-6.7%22%20style%3D%22fill%3A%23cf572e%3Bopacity%3A0.6%3Bisolation%3Aisolate%22%2F%3E%0A%3Ccircle%20cx%3D%2210.9%22%20cy%3D%227%22%20r%3D%225.9%22%20style%3D%22fill%3A%23fdbf2d%22%2F%3E%0A%3C%2Fsvg%3E%0A' };
  private navWindow: any = window;

  constructor(private cuandoLlega: CuandoLlegaService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    window.navigator.geolocation.getCurrentPosition((p: any) => {
      this.myCoordinates.lat = p.coords.latitude;
      this.myCoordinates.long = p.coords.longitude;
      this.myCoordinates.initialized = true;
    });
    this.initMap();
    //this.drawStops();
  }


  private initMap(): void {
    if (!this.myCoordinates.initialized) {
      setTimeout(() => {
        this.initMap();
      }, 1000);
      return;
    }

    //    console.log('esta son las coordenadas: ', this.myCoordinates);
    this.map = new this.navWindow.google.maps.Map(this.theMap.nativeElement, {
      center: { lat: this.myCoordinates.lat, lng: this.myCoordinates.long },
      zoom: 23
    });

    this.setPersonMarker();
    this.drawStops();

    this.map.addListener('click', p => {
      this.myCoordinates.long = p.latLng.lng();
      this.myCoordinates.lat = p.latLng.lat();

      this.setPersonMarker();

      this.drawStops();

    });


  }

  /**
   *
   */
  private setPersonMarker(): void {
    if (this.personMarker.marker) { this.personMarker.marker.setMap(null); }
    const googleMaps = (window as any).google.maps;
    this.personMarker.marker = new googleMaps.Marker(
      {
        position: new googleMaps.LatLng(this.myCoordinates.lat, this.myCoordinates.long),
        icon: this.personMarker.image,
        map: this.map
      }
    );
  }

  /**
   *
   * @param pMap
   */
  private deleteStops(pMap): void {
    const l = this.busStopMarkers.length;
    if (l === 0) { return; }

    for (let i = 0; i < l; i++) {
      pMap.event.removeListener(this.busStopMarkers[i].listener);
      this.busStopMarkers[i].marker.setMap(null);
    }
  }

  /**
   *
   */
  public drawStops(): void {
    const googleMaps = (window as any).google.maps;
    const l = paradas.length;
    let dist: number;

    this.deleteStops(googleMaps);

    for (let i = 0; i < l; i++) {

      dist = this.calcDistance(this.myCoordinates, paradas[i]);
      if (dist > 0.00002) { continue; }


      console.log('Distancia ', dist);
      const markerTmp = { marker: null, listener: null };

      const market = new googleMaps.Marker(
        {
          position: new googleMaps.LatLng(paradas[i].y, paradas[i].x),
          icon: "https://cdn1.iconfinder.com/data/icons/Keyamoon-IcoMoon--limited/32/bus.png",
          map: this.map
        }
      );
      markerTmp.marker = market;

      markerTmp.listener = market.addListener('click', () => {
        this.checkBuss(paradas[i].parada, 146);
      });

      this.busStopMarkers.push(markerTmp);
    }

  }

  /**
   *
   * @param a coordenada inicial
   * @param b coordenada final
   */
  private calcDistance(myPoss: Coordinates, b: parada): number {
    const lat: number = b.y - myPoss.lat;
    const long: number = b.x - myPoss.long;

    return (lat * lat) + (long * long);
  }

  public checkBuss(pParada, pEntidad): void {
    console.log('chequeando  ', pParada, pEntidad);
    this.cuandoLlega.getInfoParada(pParada, pEntidad).subscribe(p => {
      let mensajito = "";
      for (let i = 0; i < p.length; i++) {
        mensajito += p[i].LineaBandera + ' : ' + p[i].arribo + '\n';
      }
      alert(mensajito);
    })
  }

}
