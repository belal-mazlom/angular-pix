import {Injectable} from '@angular/core';

import {Image} from './models/image';

@Injectable()
export class ImageService {

  getImages(): Promise<Image[]> {
    return new Promise((resolve, reject) => {
      try {
        let images = localStorage.getItem('images_list');
        if (!images) {
          images = [];
        } else {
          images = JSON.parse(images);
        }
        resolve(images);
      } catch (error) {
        reject(error.message || error);
      }
    });
  }

  getImage(id: number): Promise<Image> {
    return this.getImages().then(images => images.find(image => image.id === id));
  }

  create(image: Image, source): Promise<Image> {
    return new Promise((resolve, reject) => {
      try {
        if (image) {
          let images = localStorage.getItem('images_list');
          if (!images) {
            images = [];
          } else {
            images = JSON.parse(images);
          }
          images.push(image);
          localStorage.setItem('images_list', JSON.stringify(images));
          // Save binary value
          localStorage.setItem('image_' + image.id, source);

          resolve(image);
        }
      } catch (error) {
        reject(error.message || error);
      }
    });
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        let images = localStorage.getItem('images_list');
        if (images) {
          images = JSON.parse(images);
          for (let i = 0; i < images.length; i++) {
            if (images[i].id === id) {
              images.splice(i, 1);
            }
          }
          localStorage.setItem('images_list', JSON.stringify(images));
          // Remove binary value
          localStorage.removeItem('image_' + id);
        }
        resolve(null);
      } catch (error) {
        reject(error.message || error);
      }
    });
  }
}
