import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './js/apiService';
import { renderPhotosList } from './js/renderPhotosList';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const gallery = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');
  const loadMoreBtn = document.querySelector('.load-more');

  let currentPage = 1;
  let currentQuery = '';

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    currentQuery = searchForm.elements.searchQuery.value.trim();
    if (!currentQuery) return;
    loadMoreBtn.classList.remove('active');
    gallery.innerHTML = '';
    loader.classList.add('active');
    currentPage = 1;

    try {
      const { data } = await getPhotos(currentQuery, currentPage);
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

      renderPhotosList(data.hits, gallery);
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
    const loadMoreLoader = document.createElement('div');
    loadMoreLoader.classList.add('loader-more');
    loadMoreBtn.insertAdjacentElement('afterend', loadMoreLoader);
    loadMoreBtn.classList.remove('active');

    try {
      const { data } = await getPhotos(currentQuery, ++currentPage);
      renderPhotosList(data.hits, gallery);

      loadMoreLoader.remove();
      loadMoreBtn.classList.add('active');
      lightbox.refresh();

      window.scrollBy({
        top: gallery.firstChild.getBoundingClientRect().height * 2,
        behavior: 'smooth',
      });

      if (data.totalHits < currentPage * 15) {
        loadMoreBtn.classList.remove('active');
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of the results.",
          position: 'topRight'
        });
      }
    } catch (error) {
      console.log(error);
      loadMoreLoader.remove();
      iziToast.error({
        title: 'Error',
        message: 'Failed to load more images. Please try again later.',
        position: 'topRight'
      });
    }
  });

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
});

