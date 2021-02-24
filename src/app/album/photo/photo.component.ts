import { Component, OnDestroy, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PhotoModel } from 'src/app/Model/photo.model';
import { PhotosService } from 'src/app/Services/photo.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, OnDestroy {
  paramSub: Subscription;
  retrievePhoto: Subscription;
  newPhotoSub: Subscription;
  photos: PhotoModel[] = [];
  albumID: number;
  constructor(private photoService: PhotosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe((params: Params) => {
      this.albumID = parseInt(params.id, 10);
      this.getPhotos(this.albumID);
    });
    this.retrievePhoto = this.photoService.photosChanged.subscribe(photos => {
      // this.photos = photos;
      const relevantPhotos: PhotoModel[] = [];
      photos.forEach(element => {
        if (element.albumId === this.albumID) {
          relevantPhotos.push(element);
        }
      });
      this.photos = relevantPhotos;
    });
  }

  getPhotos(id: number): void {
    this.retrievePhoto = this.photoService.getPhotos().subscribe(photos => {
      const relevantPhotos: PhotoModel[] = [];
      photos.forEach(element => {
        if (element.albumId === id) {
          relevantPhotos.push(element);
        }
      });
      this.photos = relevantPhotos;
    });
  }

  onDelete(e: Event): void{
    this.photos.forEach(element => {
      if (_.isEqual(element, e)){
        // this.photos.splice(this.photos.indexOf(element), 1);
        this.photoService.deletePhotos(element);
      }
    });
  }

  onBack(): void{
    this.router.navigate(['..'], { relativeTo: this.route});
  }
  onNew(): void{
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.retrievePhoto.unsubscribe();
    // this.newPhotoSub.unsubscribe();
  }
}
