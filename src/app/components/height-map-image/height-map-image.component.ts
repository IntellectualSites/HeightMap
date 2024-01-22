import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from "../../services/ImageService/image.service";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-height-map-image',
  templateUrl: './height-map-image.component.html',
  styleUrls: ['./height-map-image.component.scss']
})
export class HeightMapImageComponent implements OnInit {

  @Input()
  image: string = ''

  @Input()
  imageSelect: Subject<string> | undefined;

  private isSelectedImage: boolean = false;

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
        this.imageSelect?.subscribe(value => {
          this.isSelectedImage = value === this.image;
        });
  }
  getImageUrl(): string {
    return this.imageService.getImageUrl(this.image);
  }

  getImageName() {
    return this.image.substring(0, this.image.lastIndexOf('.')).replace("_", " ");
  }

  selectImage() {
    this.imageSelect?.next(this.image);
  }

  isSelected(): string {
    if (this.isSelectedImage) {
      return 'backdrop-blur-md bg-black/60'
    }
    return 'backdrop-blur-md bg-white/10';
  }

  inFolder() : boolean {
    return this.image.includes('/');
  }

  getFolderPath() : string{
    const name = this.getImageName();
    return name.substring(0, name.lastIndexOf('/') + 1);
  }

  getImageNameWithoutSlash(): string {
    const name = this.getImageName();
    return name.substring(name.lastIndexOf('/') + 1, name.length);
  }
}
