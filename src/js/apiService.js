'user strict';

import axios from 'axios';

export async function imgPix(query, currentPage) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/?key=';
  const API_KEY = '36655990-0724db180fb71d9be8c2c1bf3';

  const url = `${BASE_URL}${END_POINT}${API_KEY}`;

  const options = {
    method: 'GET',
    params: {
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '15',
      page: currentPage,
      q: query,
    },
  };

  const res = await axios.get(url, options);
  return res.data;
}