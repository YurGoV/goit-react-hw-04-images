import axios from 'axios';

export const getImages = async (query, page, perPage) => {
  // console.log(query, page);
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key:'30695501-7cf0afb8f69a77a083ed747e6',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    }
  });
  return response.data;
};
