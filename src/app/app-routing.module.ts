import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { EditComponent } from './album/photo/edit/edit.component';
import { NewphotoComponent } from './album/photo/newphoto/newphoto.component';
import { PhotoComponent } from './album/photo/photo.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path: 'album', component: AlbumComponent},
  {path: 'album/:id', component: PhotoComponent},
  {path: 'album/:id/new', component: NewphotoComponent},
  {path: 'album/:albumid/:id/edit', component: EditComponent},
  {path: '', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
