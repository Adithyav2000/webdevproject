import { createSlice } from "@reduxjs/toolkit";
import tuits from './tuits.json';
const currentUser = {
    "userName": "NASA",
    "handle": "@nasa",
    "image": "nasa.png",
   };
   
   const templateTuit = {
    ...currentUser,
    "topic": "Space",
    "time": "2h",
    "liked": false,
    "replies": 0,
    "retuits": 0,
    "likes": 0,
   }
   
const tuitsSlice = createSlice({
 name: 'tuits',
 initialState: { tuits: tuits },
 reducers: {
  liked(state, action) {
    const index = state.tuits
       .findIndex(tuit =>
          tuit._id === action.payload);
    const flag = !state.tuits[index].liked
    state.tuits[index].liked = flag;
    state.tuits[index].likes=flag ? state.tuits[index].likes+1 : state.tuits[index].likes-1
  },

  deleteTuit(state, action) {
    const index = state.tuits
       .findIndex(tuit =>
          tuit._id === action.payload);
    state.tuits.splice(index, 1);
  },
    createTuit(state, action) {
      state.tuits.unshift({
        ...action.payload,
        ...templateTuit,
        _id: (new Date()).getTime(),
      })
    }
  }
 });
 
 export const {createTuit, deleteTuit, liked} = tuitsSlice.actions;
 

export default tuitsSlice.reducer