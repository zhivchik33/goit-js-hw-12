
export const createGalleryCardTemplate = imgInfo => {
  return `
  <li class="gallery-card">
    <a class="gallery-a" href="${imgInfo.largeImageURL}">
       <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}"  />
    </a>

<ul class="img-description-list">
  <li class="img-description-el">
  <p>Likes</p>
  <p>${imgInfo.likes}</p></li>
  <li class="img-description-el">
  <p>Views</p>
  <p>${imgInfo.views}</p></li>
  <li class="img-description-el">
  <p>Comments</p>
  <p>${imgInfo.comments}</p></li>
  <li class="img-description-el">
  <p>Downloads</p>
  <p>${imgInfo.downloads}</p></li>
</ul>
  </li>`;
};