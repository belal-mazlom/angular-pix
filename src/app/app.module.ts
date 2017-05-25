import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent}         from './app.component';
import {DashboardComponent}   from './dashboard.component';
import {ImagesListComponent}      from './images-list.component';
import {ImageDetailComponent}  from './image-detail.component';
import {ImageService}          from './image.service';

@NgModule({
  imports: [
    BrowserModule
    , FormsModule
    , AppRoutingModule
  ],
  declarations: [AppComponent, DashboardComponent, ImagesListComponent, ImageDetailComponent],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
