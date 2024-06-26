import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderPhotosList } from './js/renderPhotosList';
import { getPhotos } from './js/apiService';

const submitForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';
loadMoreBtn.style.setProperty('display', 'none', 'important');
let total = 0;

submitForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadPhotos);

let gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt' });

function onSearch(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;
  galleryList.innerHTML = '';
  total = 0;

  if (searchQuery !== '') {
    page = 1;
    onLoadPhotos();
    loadMoreBtn.style.setProperty('display', 'none', 'important');
  };
};

function onLoadPhotos() {
  loadMoreBtn.style.setProperty('display', 'none', 'important');
  getPhotos(searchQuery, page)
    .then((array) => {
      renderPhotosList(array.hits, galleryList, gallery);
      total += array.hits.length;
      const totalHits = array.totalHits;

      if (total === 0) {
         iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      } else if (total >= totalHits) {
         iziToast.error({
      title: 'Error',
      message: 'You have reached the end of the search results.',
    });
      } else {
        loadMoreBtn.style.removeProperty('display'); 
        forScrollPage();
        if (page === 2) {
          iziToast.success({
    title: 'Hooray!',
    message: `We found ${totalHits} images.`,
});
        }
      }
    })
    .catch((error) => {
       iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
    });
  page += 1;
}

function forScrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};