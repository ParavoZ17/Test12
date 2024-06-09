import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import pixabayApi from './js/pixabay-api';
import picture from './js/render-functions';
const input = document.querySelector('.searchImages');
const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loadingInfo = document.querySelector('.loadingMessage');
const searchButton = document.querySelector('.search_btn');
loadingInfo.style.display = 'none';

const error = () => {
  iziToast.error({
    title: 'Attention',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
};

let text = '';
let page = 1;
let per_page = 15;


form.addEventListener('submit', async e => {
  e.preventDefault();
  loadingInfo.style.display = 'block';
  text = input.value;

  try {
    const data = await pixabayApi.getImages(text, page, per_page);
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

 searchButton.style.display = 'block';

    lightbox.refresh();

  } catch (err) {
    loadingInfo.style.display = 'none';
    console.error('Error fetching images:', err);
    error();
  }
});

// searchButton.addEventListener('click',async e => {
//   try {
//   e.preventDefault();
//   page += 1;
//   const data = await pixabayApi.getImages(text, page, per_page);
//   const { hits } = data;
//   const galleryItems = hits.map(imgItem => picture.createImages(imgItem));

//   if (galleryItems.length === 0) error();
    
//   loadingInfo.style.display = 'none';
//   gallery.append(...galleryItems);
//   searchButton.style.display = 'block';

//   const lightbox = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//     captionPosition: 'bottom',
//   });

//   lightbox.refresh();
//   } catch (err) {
//     error();
//   }
// });
