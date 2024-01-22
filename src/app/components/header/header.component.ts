import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ImageService} from "../../services/ImageService/image.service";
import {environment} from "../../../environments/environment";
import {Subject} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => active', [ // using status here for transition
        animate('2s', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {


  image: string = 'Shape 3.png'
  @Input()
  selectedImage: Subject<string> | undefined;
  showNotification: boolean = false;


  constructor(private imageService: ImageService, private changesRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.selectedImage?.subscribe(value => {
      this.image = value;
      this.changesRef.detectChanges();
    });
  }

  getImageUrl(): string {
    return this.imageService.getImageUrl(this.image);
  }

  getCommand(): string {
    return environment.command;
  }

  getInGameCommand() : string {
    return environment.command.replace(environment.replaceString, this.imageService.getFilePath(this.image));
  }

  protected readonly environment = environment;

  animationDone() {
    this.showNotification = false;
  }

  copyToClipboard() : string{
    return this.getInGameCommand();
  }
}
