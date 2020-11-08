import { createStore, createEvent, createEffect } from 'effector'
import { request } from "./../utils/request";

const suggestMovie = createEvent()
const movie = createStore()

const fetchMovie = createEffect({
  handler: async (movie) => {
    try {
      const response = await request('get', `predict/${movie}`, 'prediction')
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
})

movie.on(fetchMovie, () => {

})