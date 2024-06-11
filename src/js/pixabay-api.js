import axios from 'axios';

async function getImages(text, page, per_page) {
  const searchParams = new URLSearchParams({
    key: '44211442-9d91bcb26581fffa86e5a5ce6',
    q: `${text}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page,
  });
  const response = await axios.get(`https://pixabay.com/api?${searchParams}`);
  return response.data;
}

export default {
  getImages,
};
