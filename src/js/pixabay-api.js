
<<<<<<< Updated upstream
const PrivatKey = '44211442-9d91bcb26581fffa86e5a5ce6';
 
function makeUrl(text) {
    const BASEURL = `https://pixabay.com/api/`;
    const ENDPOINT = `image_type=photo&orientation=horizontal&safesearch=true&per_page=15`;
    const KEY = `?key=${PrivatKey}&`;
    const PARAMS = `q=${text}&`
   return  BASEURL+KEY+PARAMS+ENDPOINT;  
}
=======
import axios from "axios";

async function getImages(text, page, per_page) {
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
      `https://pixabay.com/api?${searchParams}&`
    );
    return response.data;
  }

>>>>>>> Stashed changes

function getImages (text) {
    return fetch (makeUrl(text)).then(res=>res.json());
}   

export default {
    getImages,
};