import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../api/api";

const initialState = {
  jokes: [],
  jokesOriginal: [],
  categories: [],
  currentJoke: {},
  total: 0,
  currentCategory: ""
};

export const fetchJokes = createAsyncThunk("jokes/fetchJokes", async (searchValue) => {
  const response = await apiClient.get("/search",
    {
      params: {
        query: searchValue
      }
    });
  return response.data;
});
export const fetchCategories = createAsyncThunk("jokes/fetchCategories", async () => {
  const response = await apiClient.get("/categories");
  return response.data;
});
export const fetchJokesId = createAsyncThunk("jokes/fetchJokesId", async (id) => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
});
const mainReducer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentCategory(state, action) {
      // фильтрация по категории. Добавил поле jokesOriginal чтобы обращаться к нему при фильтрации.
      // Как правило, это лучше делать на бэке, а с клиента через get-параметры регулировать и пагинацию и фильтрацию
      // В текущем api не предусмотрена фильтрация просто по категории. Только рандомная joke с категорией.
      state.currentCategory = action.payload;
      if (state.jokesOriginal?.result?.length > 0 && action.payload) {
        let newJokes = [...state.jokesOriginal.result];
        newJokes = newJokes.filter(joke => joke.categories.includes(action.payload));
        state.jokes.result = newJokes;
        state.total = newJokes?.length;
      }
    },
    setCurrentJokeId(state, action) {
      state.currentJoke = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchJokes.fulfilled, (state, action) => {
        state.jokes = action.payload;
        state.jokesOriginal = action.payload;
        state.total = action.payload?.total;
      })
      .addCase(fetchJokesId.fulfilled, (state, action) => {
        state.currentJoke = action.payload;
      });
  } 
});
export const {setCurrentCategory, setCurrentJokeId} = mainReducer.actions;
export default mainReducer.reducer;