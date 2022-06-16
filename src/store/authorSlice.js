import { createSlice } from "@reduxjs/toolkit";

const authorSlice = createSlice({
  name: "author",
  initialState: {
    authors: [],
    count: 0,
  },
  reducers: {
    addAuthor: (state, action) => {
      state.count = state.count + 1;
      return state;
    },
    setAuthors: (state, action) => {
      state.authors = action.payload;
      return state;
    },
    updateAuthorDelete:(state,action)=>{
        let newAuthor=action.payload;
        for(let i=0;i<state.authors.length;i++){
            if(state.authors[i].name === newAuthor.name){
                state.authors[i]=newAuthor;
                return state;
            }
        }
    }
  },
});

export default authorSlice.reducer;
export const { addAuthor ,setAuthors,updateAuthorDelete} = authorSlice.actions;
