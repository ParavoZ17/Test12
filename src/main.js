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
const NOMOREIMAGES = "We're sorry, but you've reached the end of search results.";
const NOIMAGES ='Sorry, there are no images matching your search query. Please try again!'
const ERROR = 'Sorry, somthimg went wrong...'

const error = (sms) => {
  iziToast.error({
    title: 'Attention',
    message: sms,
    position: 'topRight',
  });
};

let text = '';
let page = 1;
let per_page = 15;
const isLastPage = total =>  Math.ceil(total/per_page) === page;

form.addEventListener('submit', async e => {
  e.preventDefault();
  loadingInfo.style.display = 'block';
  text = input.value;
  if (text == 0) {
    loadingInfo.style.display = 'none';
    return error(`Search text cant be empty!`)}
  page = 1;
  try {
    const data = await pixabayApi.getImages(text, page, per_page);
    const { hits } = data;
    const galleryItems = hits.map(imgItem => picture.createImages(imgItem));

    if (galleryItems.length === 0) error(NOIMAGES);
    gallery.innerHTML = '';
    loadingInfo.style.display = 'none';
    gallery.append(...galleryItems);
    
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });

    if (isLastPage(totalHits)) { 
      searchButton.style.display = 'none';
    error(NOMOREIMAGES);
      
  } else {
    searchButton.style.display = 'block';
  }

    lightbox.refresh();

  } catch (err) {
    loadingInfo.style.display = 'none';
    
    error(ERROR);
  }
});

searchButton.addEventListener('click',async e => {
  try {
  e.preventDefault();
  page += 1;
  const data = await pixabayApi.getImages(text, page, per_page);
  const { hits, totalHits } = data;
  const galleryItems = hits.map(imgItem => picture.createImages(imgItem));

  if (galleryItems.length === 0) error();
    
  loadingInfo.style.display = 'none';
  gallery.append(...galleryItems);
 
  if (isLastPage(totalHits)) { 
    searchButton.style.display = 'none';
  error(NOMOREIMAGES);
    
} else {
  searchButton.style.display = 'block';
}

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });

  lightbox.refresh();
  } catch (err) {
    error(ERROR);
    console.log(err)
  }
});
