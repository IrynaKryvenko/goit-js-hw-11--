import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkup } from "./js/renderPhotosList.js";
import { searchImages } from "./js/apiService.js";

const lightbox = new SimpleLightbox('.gallery div', {
  nav: true,
  captions: true,
  captionsData: 'alt',
  captionDelay: 150,
});
const perPage = 15;

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-btn');

searchForm.addEventListener('submit', handleSearch);
loader.style.display = 'none';
loadMoreBtn.style.display = 'none';

let currentPage;
let currentQuery;
let totalHits;


async function handleSearch(event) {
  event.preventDefault();
  loader.style.display = 'block';
  gallery.innerHTML = '';

  const form = event.currentTarget;
  const searchWord = form.elements.searchWord.value.trim();

  if (searchWord === '') {
    iziToast.error({
      titleColor: '#FFFFFF',
      backgroundColor: '#ef4040',
      position: 'topRight',
      messageColor: '#FFFFFF',
      message: 'Please search for something',
    });
    loader.style.display = 'none';
    return;
  }

  try {
    const arr = await searchImages(searchWord, perPage, 1);
    totalHits = arr.totalHits;
    gallery.innerHTML = createMarkup(arr);
    currentQuery = searchWord;
    currentPage = 1;
    lightbox.refresh();
    if (!totalHits || totalHits <= currentPage * perPage) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loader.style.display = 'none';
  }
}

loadMoreBtn.addEventListener('click', async (event) => {
  loader.style.display = 'block';
  currentPage += 1;

  try {
    const data = await searchImages(currentQuery, perPage, currentPage);

    if (data.hits && data.hits.length > 0) {
      gallery.innerHTML += createMarkup(data);
      lightbox.refresh();
      smoothScroll();
      
      if (currentPage * perPage >= totalHits) {
        loadMoreBtn.style.display = 'none';
        iziToast.show({
          title: 'info',
          titleColor: '#FFFFFF',
          backgroundColor: '#6C8CFF',
          position: 'topRight',
          messageColor: '#FFFFFF',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } else {
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    console.error('Error:', error);
    alert(error.message);
  } finally {
    loader.style.display = 'none';
  }
});

function smoothScroll() {
  const galleryHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: 2 * galleryHeight,
    behavior: 'smooth'
  });
}