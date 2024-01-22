import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  assetsFolder = "assets"

  constructor(private http: HttpClient) {
  }


  getImage(fileName: string): Observable<Object> {
    return this.http.get(`${this.assetsFolder}/${fileName}`);
  }


}
