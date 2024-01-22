import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { HeightMapImageComponent } from './components/height-map-image/height-map-image.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeightMapImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
