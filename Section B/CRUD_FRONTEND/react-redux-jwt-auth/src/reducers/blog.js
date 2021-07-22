import {
    CREATE_BLOG,
    RETRIEVE_BLOGS,
    UPDATE_BLOG,
    DELETE_BLOG,
    DELETE_ALL_BLOGS
  } from "../actions/types";

  const initialState = [];

function blogReducer(blogs = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BLOG:
      return [...blogs, payload];

    case RETRIEVE_BLOGS:
      return payload;

    case UPDATE_BLOG:
      return blogs.map((blog) => {
        if (blog.id === payload.id) {
          return {
            ...blog,
            ...payload,
          };
        } else {
          return blog;
        }
      });

    case DELETE_BLOG:
      return blogs.filter(({ id }) => id !== payload.id);

    default:
      return blogs;
  }
};

export default blogReducer;