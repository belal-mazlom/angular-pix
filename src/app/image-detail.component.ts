import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {ImageService} from './image.service';
import {Image} from './models/image';

@Component({
  selector: 'image-detail',
  templateUrl: './html/image-detail.component.html',
  styleUrls: ['./css/image-detail.component.css'],
})
export class ImageDetailComponent implements OnInit {
  image: Image;
  imageSource: null;
  constructor(private imageService: ImageService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.imageService.getImage(+params['id']))
      .subscribe(image => {
        this.image = image;
        this.imageSource = localStorage.getItem('image_' + image.id);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
