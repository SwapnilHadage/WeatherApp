import {configureStore} from '@reduxjs/toolkit'
import setupReducer from './slices/setupSlice'

const store = configureStore({
  reducer:{
    setup : setupReducer,
  },
  devTools : true,
})


export default store;