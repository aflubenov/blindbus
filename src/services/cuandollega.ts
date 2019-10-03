import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CuandoLlegaService {
  constructor(private http: HttpClient) { }

  public isQuerying: boolean = false;

  public getInfoParada(pParada: number, pEntidad: number): Observable<any> {
    this.isQuerying = true;
    return this.http.get('/users/getparada/' + pParada + '/' + pEntidad).pipe(
      tap(p => {
        this.isQuerying = false;
      }
      )
    );
  }
}
