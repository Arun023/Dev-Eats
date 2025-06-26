import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latitude: null,
  longitude: null,
  city: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.lat;
      state.longitude = action.payload.lng;
      state.city = action.payload.city || null; // Optional city field
    },
    clearLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
      state.city = null;
    },
  },
});

export const { setLocation, clearLocation } = authSlice.actions;
export default authSlice.reducer;
