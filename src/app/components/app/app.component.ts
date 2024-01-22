import { Component } from '@angular/core';
import {IMAGES} from "../../models/images";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HeightMap';

  protected selectedImage: Subject<string> = new Subject<string>();

  getImages(): string[] {
    return IMAGES;
  }
}
