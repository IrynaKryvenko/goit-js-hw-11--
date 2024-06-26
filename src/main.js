import './css/styles.css';
import { getPhotos } from './js/apiService';
import { renderPhotosList } from './js/renderPhotosList';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.js-search-form');
const searchList = document.querySelector('.js-search-list');
const loader = document.querySelector('.js-loader');
const loadMoreLoader = document.querySelector('.js-load-more-loader');
const loadMoreBtn = document.querySelector('.js-load-more-btn');

let currentPage = 1;
let totalPages = 1;
let currentQuery = '';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = searchForm.elements.enterForSearch.value.trim();
  if (!currentQuery) return;
  if (loadMoreBtn.classList.contains('active')) {
    loadMoreBtn.classList.remove('active');
  }
  searchList.innerHTML = '';
  loader.classList.add('active');
  currentPage = 1;

  try {
    const { data } = await loadImages(currentQuery, currentPage);
    if (!data.total) {
      loader.classList.remove('active');
      iziToast.error({
        title: 'Error',
        message: 'No images found matching your search query. Please try again!',
        position: 'topRight'
      });
      searchForm.reset();
      return;
    }

    searchList.innerHTML = `${generateGallery(data.hits)}`;
    loader.classList.remove('active');
    loadMoreBtn.classList.add('active');

    if (data.totalHits < 15) {
      loadMoreBtn.classList.remove('active');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of the results.",
        position: 'topRight'
      });
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    loader.classList.remove('active');
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight'
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  loadMoreLoader.classList.add('active');
  loadMoreBtn.classList.remove('active');

  try {
    const { data } = await loadImages(currentQuery, ++currentPage);
    searchList.insertAdjacentHTML('beforeend', `${generateGallery(data.hits)}`);

    loadMoreLoader.classList.remove('active');
    loadMoreBtn.classList.add('active');
    lightbox.refresh();

    window.scrollBy({
      top: searchList.firstChild.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });

    totalPages = Math.ceil(data.totalHits / 15);
    if (totalPages === currentPage) {
      loadMoreBtn.classList.remove('active');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of the results.",
        position: 'topRight'
      });
    }
  } catch (error) {
    console.log(error);
    loadMoreLoader.classList.remove('active');
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
      position: 'topRight'
    });
  }
});

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});
