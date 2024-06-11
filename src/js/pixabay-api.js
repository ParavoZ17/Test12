
const PrivatKey = '44211442-9d91bcb26581fffa86e5a5ce6';
 
function makeUrl(text) {
    const BASEURL = `https://pixabay.com/api/`;
    const ENDPOINT = `image_type=photo&orientation=horizontal&safesearch=true&per_page=15`;
    const KEY = `?key=${PrivatKey}&`;
    const PARAMS = `q=${text}&`
   return  BASEURL+KEY+PARAMS+ENDPOINT;  
}

function getImages (text) {
    return fetch (makeUrl(text)).then(res=>res.json());
}   

export default {
    getImages,
};