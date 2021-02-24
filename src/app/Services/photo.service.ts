import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { PhotoModel } from '../Model/photo.model';
import * as _ from 'lodash';

@Injectable()
export class PhotosService {
  photosObs: Observable<PhotoModel[]>;
  photos: PhotoModel[];
  photosChanged = new Subject<PhotoModel[]>();
  private photosUrl = 'https://jsonplaceholder.typicode.com/photos';
  constructor(private http: HttpClient) {
    this.photosObs = this.http.get<PhotoModel[]>(this.photosUrl);
    // this.getPhotos();
  }

  getPhotos(): Observable<PhotoModel[]> {
    if (this.photos) {
      return of(this.photos);
    } else{
      this.photosObs.subscribe(photos => {
        this.photos = photos;
      });
      return this.photosObs;
    }
  }

  addPhoto(photo: PhotoModel): void {
    this.photos.unshift(photo);
    console.log(photo);
    this.photosChanged.next(this.photos.slice());
  }

  getPhoto(albumId: number, photoId: number): PhotoModel {
    let p: any = null;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.photos.length; index++){
      if (this.photos[index].albumId === albumId && this.photos[index].id === photoId){
        p = this.photos[index];
        return p;
      } else {
        continue;
      }
  }
}

  editPhoto(photo: PhotoModel, title: string, url: string): void{
    for(let i = 0; i < this.photos.length; i++){
      if (_.isEqual(this.photos[i], photo)){
        this.photos[i].thumbnailUrl = url;
        this.photos[i].title = title;
      }
    }
    this.photosChanged.next(this.photos.slice());
  }

  deletePhotos(photo: PhotoModel): void {
    for (let index = 0; index < this.photos.length; index++){
      if (_.isEqual(this.photos[index], photo)){
        console.log(this.photos.length);
        this.photos.splice(index, 1);
        console.log(this.photos.length);
        break;
      }
    }
    this.photosChanged.next(this.photos.slice());
  }
}
