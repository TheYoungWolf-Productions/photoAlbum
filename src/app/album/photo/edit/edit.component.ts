import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { PhotoModel } from 'src/app/Model/photo.model';
import { PhotosService } from 'src/app/Services/photo.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  success = false;
  newPhotoEvent: EventEmitter;
  albumID: number;
  photoID: number;
  photo: PhotoModel;
  myForm: FormGroup;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(private route: ActivatedRoute, private photoService: PhotosService, private router: Router) { }

  ngOnInit(): void {
    this.albumID = parseInt(this.route.snapshot.params.albumid, 10);
    this.photoID = parseInt(this.route.snapshot.params.id, 10);
    this.photo = this.photoService.getPhoto(this.albumID, this.photoID);
    this.myForm = new FormGroup({
      title: new FormControl(this.photo.title, [ Validators.required ]),
      url: new FormControl(this.photo.thumbnailUrl, [ Validators.required, Validators.pattern(this.reg) ])
    });
  }

  onEditPhoto(): void{
    const title = this.myForm.value.title;
    const  url = 'https://via.placeholder.com/150/771796';
    const thumbnail = this.myForm.value.url;
    // const newPhoto = new PhotoModel(this.albumID, 20, title, url, thumbnail);
    // console.log(newPhoto);
    this.photoService.editPhoto(this.photo, title, url);
    this.success = true;
    setInterval(() => {
      this.success = false;
      this.router.navigate(['../..'], { relativeTo: this.route });
    }, 3000);
  }

  onBack(): void{
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
