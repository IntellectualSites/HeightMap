import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private assetsFolder: string = environment.imageFolder
  private fawePath: string = environment.basePath;

  constructor() {
  }


  getImageUrl(fileName: string): string {
    return `${this.assetsFolder}/${fileName}`;
  }

  getFilePath(fileName: string): string {
    return this.fawePath.replace(environment.replaceString, fileName);
  }


}
