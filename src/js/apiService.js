import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from "axios";
import iconError from '../img/icon-error.png';

const KEY = '42692881-f0d4d17361a73f053244a2051';
const URL = 'https://pixabay.com/api/';

const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-btn');
const searchForm = document.querySelector('.search-form');

export async function searchImages(searchWord, perPage, page) {
  
  const LINK = `${URL}?key=${KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&savesearch=true&page=${page}&per_page=${perPage}`;


  loader.style.display = 'block';

  try {
    const response = await axios.get(LINK);

    if (response.data.hits.length === 0) {
       iziToast.error({
          iconUrl: iconError,
          position: 'topRight',
          backgroundColor: '#ef4040',
          titleColor: '#FFFFFF',
          messageColor: '#FFFFFF',
          theme: 'dark',
          maxWidth: '432px',
          message:
            'There are no images matching your search query. Please, enter something else!',
        });
      loader.style.display = 'none';
      searchForm.reset()
    }
    return response.data;

  } catch (error) {
    console.error(`Error: ${error}`);
  } 
}