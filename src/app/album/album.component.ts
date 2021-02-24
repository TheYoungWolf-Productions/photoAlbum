import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumModel } from '../Model/album.model';
import { AlbumsService } from '../Services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  albums: AlbumModel[];
  constructor(private albumService: AlbumsService,
              private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void{
    this.albumService.getAlbums().subscribe( albums => {
      this.albums = albums;
    });
  }

  onClick(album: AlbumModel): void{
    this.router.navigate([album.id], {relativeTo: this.route});
  }

}
