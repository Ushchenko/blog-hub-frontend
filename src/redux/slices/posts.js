import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const {data} = await axios.get('/posts');
    return data
})

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) => {
    await axios.delete(`/posts/${id}`);
})

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Получение
            .addCase(fetchPosts.pending, (state, action) => {
                state.posts.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts.items = action.payload;
                state.posts.status = 'loaded'
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.posts.items = []
                state.posts.status = 'error'
            })
            //Удаление
            .addCase(fetchRemovePost.pending, (state, action) => {
                state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
            })
            .addDefaultCase(() => {})
    },
})

export const postsReducer = postsSlice.reducer