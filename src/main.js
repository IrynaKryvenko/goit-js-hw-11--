import './css/styles.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { getPhotos } from './js/apiService';
import { renderPhotosList } from './js/renderPhotosList';



const submitForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let page = 1;
let searchQuery = '';
loadMoreBtn.style.setProperty('display', 'none', 'important');
if (loader) {
  loader.style.setProperty('display', 'none', 'important');
}

submitForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadPhotos);

let gallery;

function onSearch(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;
  galleryList.innerHTML = '';
  page = 1;
  loadMoreBtn.style.setProperty('display', 'none', 'important');
  if (loader) {
    loader.style.setProperty('display', 'block');
  }

  if (searchQuery !== '') {
    onLoadPhotos();
  }
}

function onLoadPhotos() {
  getPhotos(searchQuery, page)
    .then((data) => {
      if (loader) {
        loader.style.setProperty('display', 'none');
      }
      renderPhotosList(data.hits, galleryList, gallery);

      if (data.hits.length > 0) {
        loadMoreBtn.style.removeProperty('display');
        page++;
      } else {
        loadMoreBtn.style.setProperty('display', 'none');
        iziToast.warning({
          title: 'Warning',
          message: 'No more images to load.',
        });
      }
    })
    .catch((error) => {
      if (loader) {
        loader.style.setProperty('display', 'none');
      }
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
    });
}

gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt' });