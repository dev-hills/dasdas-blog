import axios from "axios";

export const getFeaturedArticles = async () => {
  try {
    const response = await axios.get(
      "https://techcrunch.com/wp-json/wp/v2/posts?per_page=10"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getArticles = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(
      `https://techcrunch.com/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getArticlebyId = async (id) => {
  try {
    const response = await axios.get(
      `https://techcrunch.com/wp-json/wp/v2/posts/${id}?per_page=1`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting article by id:", error);
    throw error;
  }
};

export const getMoreArticles = async () => {
  try {
    const response = await axios.get(
      "https://techcrunch.com/wp-json/wp/v2/posts?per_page=3"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
