import {Component, OnInit} from '@angular/core';
import {Image} from './models/image';
import {ImageService} from './image.service';

@Component({
  selector: 'pix-dashboard',
  templateUrl: './html/dashboard.component.html',
  styleUrls: ['./css/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  images: Image[] = [];

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.imageService.getImages()
      .then(images => this.images = images.slice(images.length - 5, 5)); // change to get last images
  }
}
