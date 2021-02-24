import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoModel } from 'src/app/Model/photo.model';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent implements OnInit {
  @Input() photo: PhotoModel;
  @Input() index: number;
  @Output() photoDeleted = new EventEmitter<PhotoModel>();
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {}

  onEdit(photo: PhotoModel): void{
    const id = photo.id;
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  onDelete(photo: PhotoModel): void{
    this.photoDeleted.emit(photo);
  }
}
