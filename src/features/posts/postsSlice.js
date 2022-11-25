import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('/', async () => {
  try {
    const response = await axios.get(POST_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId, date) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
            },
          },
        };
      },
    },
    reactionAdded: {
      reducer(state, action) {
        const { postId, reaction } = action.payload;
        const postExists = state.posts.find((post) => post.id === postId);
        if (postExists) {
          postExists.reactions[reaction]++;
        }
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success';
        let min = 1;
        const loadPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(loadPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.error;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getAllPostsStatus = (state) => state.posts.status;
export const getAllPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
