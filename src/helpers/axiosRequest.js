import axios from 'axios';

export const axiosRequest = async ({ queryKey }) => {
  const { endpoint, url, ...rest } = queryKey[1];

  try {
    const response = await axios({
      url: `https://blueprism-server.herokuapp.com/${endpoint}`,
      ...rest
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
