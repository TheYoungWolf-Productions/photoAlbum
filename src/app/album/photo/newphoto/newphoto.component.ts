import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { PhotoModel } from 'src/app/Model/photo.model';
import { PhotosService } from 'src/app/Services/photo.service';

@Component({
  selector: 'app-newphoto',
  templateUrl: './newphoto.component.html',
  styleUrls: ['./newphoto.component.css']
})
export class NewphotoComponent implements OnInit {
  success = false;
  newPhotoEvent: EventEmitter;
  albumID: number;
  myForm: FormGroup;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(private route: ActivatedRoute, private photoService: PhotosService, private router: Router) { }

  ngOnInit(): void {
    this.albumID = parseInt(this.route.snapshot.params.id, 10);
    this.myForm = new FormGroup({
      title: new FormControl(null, [ Validators.required ]),
      url: new FormControl(null, [ Validators.required, Validators.pattern(this.reg) ])
    });
  }

  onAddPhoto(): void{
    const title = this.myForm.value.title;
    const thumbnail = 'https://via.placeholder.com/150/771796';
    const url = this.myForm.value.url;
    const newPhoto = new PhotoModel(this.albumID, 20, title, url, thumbnail);
    // console.log(newPhoto);
    this.photoService.addPhoto(newPhoto);

    this.success = true;
    setInterval(() => {
      this.success = false;
      this.router.navigate(['..'], { relativeTo: this.route });
    }, 3000);
  }

  onBack(): void{
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
