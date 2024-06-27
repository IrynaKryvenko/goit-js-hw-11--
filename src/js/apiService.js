'user strict';

import axios from 'axios';

export async function imgPix(query, currentPage) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/?key=';
  const API_KEY = '42433869-1e5be4b754d1019adc877ba0e';

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