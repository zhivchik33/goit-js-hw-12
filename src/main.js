

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';

const searchFormEl = document.querySelector(".js-search-form");
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector(".load-more");
let currentPage = 1;
let searchedValue = "";
let cardHeight = 0;
const loader = document.querySelector(".loader");

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    currentPage = 1; 
    searchedValue = searchFormEl.elements.user_query.value.trim();

    if (!searchedValue) {
      iziToast.error({
        message: "Please enter a valid search query.",
        position: 'topRight',
      });
      return;
    }

    loader.classList.remove('is-hidden');
    loadMoreBtn.classList.add('is-hidden'); 

    const response = await fetchPhotos(searchedValue, currentPage);
    if (response.data.hits.length === 0) {
      iziToast.error({
        message: "Sorry, no images found. Please try again!",
        position: 'topRight',
      });
      loader.classList.add('is-hidden');
      galleryEl.innerHTML = '';
      return;
    }

    const galleryCardsTemplate = response.data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');
    galleryEl.innerHTML = galleryCardsTemplate;

    loader.classList.add('is-hidden');
    loadMoreBtn.classList.remove('is-hidden'); 

    const galleryCardEl = galleryEl.querySelector('li');
    cardHeight = galleryCardEl.getBoundingClientRect().height;

    new SimpleLightbox('.js-gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });

    searchFormEl.reset();
  } catch (err) {
    console.error(err);
  }
}

const onLoadMore = async event => {
  try {
    currentPage++;
    loader.classList.remove('is-hidden');
    loadMoreBtn.disabled = true; 

    const response = await fetchPhotos(searchedValue, currentPage);
    const galleryCardsTemplate = response.data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');
    galleryEl.insertAdjacentHTML("beforeend", galleryCardsTemplate);

    loader.classList.add('is-hidden');
    loadMoreBtn.disabled = false; 

    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage >= Math.ceil(response.data.totalHits / 15)) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.error({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    }

  } catch (err) {
    console.error(err);
  }
}

searchFormEl.addEventListener("submit", onSearchFormSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);