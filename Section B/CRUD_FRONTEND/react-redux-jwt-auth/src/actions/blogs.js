import {
    CREATE_BLOG,
    RETRIEVE_BLOGS,
    UPDATE_BLOG,
    DELETE_BLOG,
    DELETE_ALL_BLOGS
  } from "./types";
  
  import BlogDataService from "../services/user.service";
  
  export const createBlog = (title, description) => async (dispatch) => {
    try {
      const res = await BlogDataService.createBlogPost({ title, description });
  
      dispatch({
        type: CREATE_BLOG,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveBlogs = () => async (dispatch) => {
    try {
      const res = await BlogDataService.getAllBlogPosts();
      
      dispatch({
        type: RETRIEVE_BLOGS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateBlog = (id, data) => async (dispatch) => {
    try {
      const res = await BlogDataService.updateBlogPost(id, data);
  
      dispatch({
        type: UPDATE_BLOG,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteBlog = (id) => async (dispatch) => {
    try {
      await BlogDataService.deleteBlogPost(id);
  
      dispatch({
        type: DELETE_BLOG,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const findBlogsByTitle = (title) => async (dispatch) => {
    try {
      const res = await BlogDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_BLOGS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  