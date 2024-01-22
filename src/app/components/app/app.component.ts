import { Component } from '@angular/core';
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HeightMap';

  protected selectedImage: Subject<string> = new Subject<string>();

  getImages(): string[] {
    return environment.IMAGES;
  }
}
