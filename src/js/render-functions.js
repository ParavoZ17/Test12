
const overviewImg = (imgItem) =>{
const div = document.createElement('div');
  div.classList.add('fotoInfo');

  const infoItemLikes = document.createElement('div');
  infoItemLikes.classList.add('infoItem');
  const likes = document.createElement('p');
  likes.classList.add('key');
  likes.textContent = 'likes';
  const valueLikes = document.createElement('p');
  valueLikes.classList.add('valueInfo');
  valueLikes.textContent = imgItem.likes;

  const infoItemViews = document.createElement('div');
  infoItemViews.classList.add('infoItem');
  const views = document.createElement('p');
  views.classList.add('key');
  views.textContent = 'views';
  const valueViews = document.createElement('p');
  valueViews.classList.add('valueInfo');
  valueViews.textContent = imgItem.views;

  const infoItemComments = document.createElement('div');
  infoItemComments.classList.add('infoItem');
  const comments = document.createElement('p');
  comments.classList.add('key');
  comments.textContent = 'comments';
  const valueComments = document.createElement('p');
  valueComments.classList.add('valueInfo');
  valueComments.textContent = imgItem.comments;

  const infoItemDownloads = document.createElement('div');
  infoItemDownloads.classList.add('infoItem');
  const downloads = document.createElement('p');
  downloads.classList.add('key');
  downloads.textContent = 'downloads';
  const valueDownloads = document.createElement('p');
  valueDownloads.classList.add('valueInfo');
  valueDownloads.textContent = imgItem.downloads;

  infoItemLikes.appendChild(likes);
  infoItemLikes.appendChild(valueLikes);

  infoItemViews.appendChild(views);
  infoItemViews.appendChild(valueViews);

  infoItemComments.appendChild(comments);
  infoItemComments.appendChild(valueComments);

  infoItemDownloads.appendChild(downloads);
  infoItemDownloads.appendChild(valueDownloads);

  div.appendChild(infoItemLikes);
  div.appendChild(infoItemViews);
  div.appendChild(infoItemComments);
  div.appendChild(infoItemDownloads);

  return div;
}


const createImages = (imgItem) => {
  const item = document.createElement('li');
  item.classList.add('gallery-item');
  const link = document.createElement('a');
  link.classList.add('gallery-link');
  link.href = imgItem.largeImageURL;
  const img = document.createElement('img');
  img.src = imgItem.webformatURL;
  img.alt = imgItem.tags;
  img.classList.add('gallery-image');
  link.appendChild(img);
  item.appendChild(link);
  item.appendChild(overviewImg(imgItem));

  return item;
  };


  export default {
    createImages,
  };   