import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { HeaderComponent } from './header/header.component';
import { AlbumsService } from './Services/album.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoComponent } from './album/photo/photo.component';
import { PhotosService } from './Services/photo.service';
import { NewphotoComponent } from './album/photo/newphoto/newphoto.component';
import { SinglePhotoComponent } from './album/photo/single-photo/single-photo.component';
import { EditComponent } from './album/photo/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    HeaderComponent,
    PhotoComponent,
    NewphotoComponent,
    SinglePhotoComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AlbumsService, PhotosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
