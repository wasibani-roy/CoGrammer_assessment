import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

class BlogDataService {
  getAllBlogPosts() {
    return axios.get(API_URL);
  }

  getSingleBlogPost(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createBlogPost(data) {
    return axios.post(`${API_URL}`, data, { headers: authHeader() });
  }

  updateBlogPost(id,data) {
    return axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });
  }

  deleteBlogPost(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
  findByTitle(title) {
    return axios.get(`${API_URL}/?title=${title}`);
  }
}

export default new BlogDataService();
