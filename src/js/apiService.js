import axios from 'axios';

export async function getPhoto(value, page) {
  const BASE_URL = 'https://pixabay.com/api/?';
  const params = {
    key: '36655990-0724db180fb71d9be8c2c1bf3',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };
  const url = `${BASE_URL}`;

  const res = await axios.get(url, { params });
  return res.data;
}