import axios from "axios";

const myKey = import.meta.env.VITE_API_KEY;
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = myKey;
axios.defaults.params = {
  orientation: "landscape",
};

export const getPhotos = async (query: string) => {
  const response = await axios.get(`search?query=${query}`);

  return response.data.photos;
};
