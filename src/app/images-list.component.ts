import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Image} from './models/image';
import {ImageService} from './image.service';

@Component({
  selector: 'images-list',
  templateUrl: './html/images-list.component.html',
  styleUrls: ['./css/images-list.component.css'],
})
export class ImagesListComponent implements OnInit {
  images: Image[];
  selectedImage: Image;
  uploadedImageSource: null;
  selectedImageSource: null;
  messageError: null;

  constructor(private imageService: ImageService, private router: Router) {
  }

  getImages(): void {
    this.imageService.getImages().then(images => this.images = images);
  };

  ngOnInit(): void {
    this.getImages();
  };

  onSelect(image: Image): void {
    this.selectedImage = image;
    this.selectedImageSource = localStorage.getItem('image_' + image.id);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedImage.id]);
  }

  onChangeUploader(event: any) {
    let tgt = event.target, files = tgt.files;
    // FileReader support
    if (FileReader && files && files.length) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        this.uploadedImageSource = fileReader.result;
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      alert('Your browser not support all features in this app');
    }
  };

  add(title: string, desc: string, dateImage: string): void {
    title = title.trim();
    desc = desc.trim();
    let date = new Date().getTime();

    if (!title) {
      this.messageError = 'Title required';
      return;
    }

    if (this.uploadedImageSource.length > 4 * 1024 * 1024) { // 4MB
      this.messageError = 'Max size for image is 4 MB';
      return;
    }

    let image: Image = {id: date, title: title, description: desc, tages: '', date: dateImage};

    this.imageService.create(image, this.uploadedImageSource)
      .then(_image => {
        this.images.push(_image);
        this.selectedImage = null;
      });
  }

  delete(image: Image): void {
    this.imageService
      .delete(image.id)
      .then(() => {
        this.images = this.images.filter(h => h !== image);
        if (this.selectedImage === image) {
          this.selectedImage = null;
        }
      });
  }
}
