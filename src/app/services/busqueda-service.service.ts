import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusquedaServiceService {

  constructor(private http: HttpClient) { }

  filtrar(nombre:string) {
    let queryString = sessionStorage.getItem('query');
    
    if (queryString) {
        let querys = queryString.split('&');
        let newQuerys = [];

        for (let i = 0; i < querys.length; i++) {
            if (!querys[i].startsWith('nombre=')) {
                newQuerys.push(querys[i]);
            }
        }

        newQuerys.push(`nombre=${nombre}`);
        sessionStorage.setItem('query', newQuerys.join('&'));
    } else {
        sessionStorage.setItem('query', `nombre=${nombre}`);
    }

    console.log(sessionStorage.getItem('query'));
}
}
