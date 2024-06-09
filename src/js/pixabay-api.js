
import axios from "axios";

async function getImages(text, page = 1, per_page = 15) {
    const searchParams = new URLSearchParams({
        key: '44211442-9d91bcb26581fffa86e5a5ce6',
        q:`${text}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: per_page,
      });
   
    const response = await axios.get(
      `https://pixabay.com/api?${searchParams}`
    );
    return response.data;
  }



export default {
    getImages,
};