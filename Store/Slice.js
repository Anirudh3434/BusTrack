import { createSlice } from '@reduxjs/toolkit';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        name: '',
        role: '',
        status: 'idle',
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      role: '',
      status: 'idle',
    };
  }
};

const initialState = loadState();

const storeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state) {
      state.status = 'logged_in';
    },
    logOut(state) {
      state.role = ''; 
      state.status = 'idle';
    },
    setRole(state, action) {
     
      state.role = action.payload;
    },

    setName(state , action){
        state.name = action.payload;
    }
  },
});

export const { logIn, logOut, setRole , setName} = storeSlice.actions;
export default storeSlice.reducer;
