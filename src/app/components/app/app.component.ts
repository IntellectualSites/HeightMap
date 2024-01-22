import { Component } from '@angular/core';
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected selectedImage: Subject<string> = new Subject<string>();

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }


  getImages(): string[] {
    return environment.IMAGES;
  }
}
