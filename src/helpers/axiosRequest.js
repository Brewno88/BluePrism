import axios from 'axios';

export const axiosRequest = async ({ queryKey }) => {
  const { endpoint, url, ...rest } = queryKey[1];

  try {
    const response = await axios({
      url: `http://localhost:3000/${endpoint}`,
      ...rest
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
