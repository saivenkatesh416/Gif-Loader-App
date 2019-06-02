import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { GIFS } from "../gif.model";
import { GifService } from '../gif.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gif-loader',
  templateUrl: './gif-loader.component.html',
  styleUrls: ['./gif-loader.component.css']
})
export class GifLoaderComponent implements OnInit {
  observableGifs: Observable<GIFS[]>;
  gifs: GIFS[] = [];
  errorMessage: String;
  statusMessage: String;
  beforeSubmit = true;
  afterSubmit = false;

  offset = 0;

  gifForm: FormGroup;

  constructor(private gifservice: GifService, public sanitizer: DomSanitizer){}

  ngOnInit() {
    this.beforeSubmit = true;
    this.afterSubmit = false;

    let searchName = '';

    this.gifForm = new FormGroup({
      'search': new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    this.beforeSubmit = false;
    this.afterSubmit = true;
    this.dataFromApi();
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("bottom of page");
      this.offset = this.offset + 20;
      this.dataFromApi();
    }
  }

  dataFromApi(){
    this.observableGifs = this.gifservice.getGifs(this.gifForm.value,this.offset);

    this.observableGifs
      .subscribe((gifs) => {
          if(gifs == null){
            this.statusMessage = 'gifs value is empty';
            console.log(this.statusMessage);
          } else {
            this.gifs = this.gifs.concat(gifs);
          }
        },
        (error)=> {
          this.statusMessage = 'error';
          this.errorMessage = <any>error;
        }
      );
  }

}
