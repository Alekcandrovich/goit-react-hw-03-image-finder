import axios from 'axios';

const API_KEY = '35504205-dd2dec5e4a5642491c73dfb42';

export const fetchImages = async (searchQuery, page) => {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await axios.get(url);
    const { data } = response;
    return data;
  }
   catch (error) {
    console.error(error);
    return null;
  }
};