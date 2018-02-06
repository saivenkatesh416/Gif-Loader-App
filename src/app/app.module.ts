import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GifStartComponent } from './gif-start/gif-start.component';
import { GifLoaderComponent } from './gif-loader/gif-loader.component';
import { GifService } from "./gif.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GifStartComponent,
    GifLoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [GifService],
  bootstrap: [AppComponent]
})
export class AppModule { }
