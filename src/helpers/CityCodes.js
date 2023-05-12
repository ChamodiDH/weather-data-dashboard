import axios from 'axios';

export const getCityCodes = async () => {
  try {
    const response = await axios.get('/cities.json');
    const cityCodes = Array.from(response.data.List, (city) => city.CityCode);
    return cityCodes;
  } catch (error) {
    console.error('Error fetching city codes: ', error);
    throw error;
  }
};
