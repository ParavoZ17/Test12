import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const loadingInfo = document.querySelector('.loadingMessage');

loadingInfo.style.display = 'none';

const error = () => {
  iziToast.error({
    title: 'Attention',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
};

import pixabayApi from './js/pixabay-api';
import picture from './js/render-functions';
const input = document.querySelector('.searchImages');
const form = document.querySelector('form');




const gallery = document.querySelector('.gallery');

let text = '';

form.addEventListener('submit', e => {
  e.preventDefault();
  loadingInfo.style.display = 'block';
  text = input.value;

  pixabayApi
    .getImages(text)
    .then(data => {
      const { hits } = data;
      const galleryItems = hits.map(imgItem => picture.createImages(imgItem));

      if (galleryItems.length === 0) error();
      gallery.innerHTML = '';
      loadingInfo.style.display = 'none';
      gallery.append(...galleryItems);

      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
      });

      lightbox.refresh();
    })
    .catch(err => {
      console.log(err);
      error();
    });
});
