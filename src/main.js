import { getPhotos } from './js/apiService';
import { renderPhotosList } from './js/renderPhotosList';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let page = 1;
let searchQuery = '';

loadMoreBtn.style.display = 'none';
loader.style.display = 'none';

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchQuery = searchForm.elements.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return; // Остановка выполнения функции, если поисковой запрос пустой
  }

  galleryList.innerHTML = '';
  page = 1;
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await getPhotos(searchQuery, page);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'No images found for your search query.',
        position: 'topRight',
      });
      loader.style.display = 'none';
      return;
    }

    renderPhotosList(data.hits, galleryList);

    if (data.hits.length < 15) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: 'You have reached the end of the images.',
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching photos:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await getPhotos(searchQuery, ++page);
    renderPhotosList(data.hits, galleryList);

    if (data.hits.length < 15) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: 'You have reached the end of the images.',
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching more photos:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
  }
});
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
