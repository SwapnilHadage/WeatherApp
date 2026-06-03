import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {  CurrentWeatherFetch,
          WeeklyWeatherFetch,
          DailyWeatherFetch,
          GetLocFromCity,
          GetLocFromPincode,
} from '../../services/weatherService';

export const currentWeather = createAsyncThunk(
  "Weather/getCurrentWeather",
  async(coords, thunkAPI)=>{
    try {
      const res = await CurrentWeatherFetch(coords);
      return res;
      
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message:  error.response?.data?.message || error.message || "Something went wrong",
        code: error.code || null,
        status: error.response?.status || null,
        statusText: error.response?.statusText || null,
      });
    }
  }
);

export const todayWeather = createAsyncThunk(
  "Weather/getTodaysWeather",
  async(coords, thunkAPI)=>{
    try {
      const res = await DailyWeatherFetch(coords);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message || "Something went wrong",
        code: error.code || null,
        status: error.response?.status || null,
        statusText: error.response?.statusText || null,
      });
    }
  }
);

export const weekWeather = createAsyncThunk(
  "Weather/getWeekWeather",
  async(coords, thunkAPI)=>{
    try {
      const res = await WeeklyWeatherFetch(coords);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message || "Something went wrong",
        code: error.code || null,
        status: error.response?.status || null,
        statusText: error.response?.statusText || null,
      });
    }
  }
);

export const coordsFromCity = createAsyncThunk(
  "Weather/getCoordsfromCity",
  async(city, thunkAPI)=>{
    try {
      const location = await GetLocFromCity(city);
      return location;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message || "Something went wrong",
        code: error.code || null,
        status: error.response?.status || null,
        statusText: error.response?.statusText || null,
      });
    }
  }
);

export const coordsFromPin = createAsyncThunk(
  "Weather/getCoordsfromPin",
  async(pin, thunkAPI)=>{
    try {
      const location = await GetLocFromPincode(pin);
      return location;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message || "Something went wrong",
        code: error.code || null,
        status: error.response?.status || null,
        statusText: error.response?.statusText || null,
      });
    }
  }
);

const setup = createSlice({
  name: 'setup',
  initialState:{
    currentWeatherData: null,
    todaysWeatherData: null,
    weekWeatherData: null,
    language: 'English',
    location: null,
    mode: 'working Professional',
    theme:0,
    coords : null,
    loading: false,
    error: null,
    
  },
  reducers:{
    changeCoords : (state, action)=>{
      state.coords = {
        lat : action.payload.lat,
        lon : action.payload.lon,
      }
    },
    changeMode :(state,action)=>{
      state.mode = action.payload;
    },
    changeLanguage :(state,action)=>{
      state.language = action.payload;
    },
    changeTheme :(state,action)=>{
      state.theme = !state.theme; //toggle
    },
  },

  extraReducers: (builder)=>{
    builder
    //Current Weather
    .addCase(currentWeather.pending, (state)=>{
      state.loading = true;
      state.error = null;
      console.log("pending curr api call");
      
    })
    .addCase(currentWeather.fulfilled, (state, action)=>{
      state.loading = false;
      state.error = null;
      state.currentWeatherData = action.payload;
      console.log("success");
    })
    .addCase(currentWeather.rejected, (state, action)=>{
      state.loading = false;
      state.error = {
        message: action.payload?.message,
        code: action.payload?.code,
        status: action.payload?.status,
        statusText: action.payload?.statusText,
      };
      console.log('curr api call failed');
      
    })

    //Todays Weather
    .addCase(todayWeather.pending, (state)=>{
      state.loading = true;
      state.error = null;
      console.log("loading........");
      
    })
    .addCase(todayWeather.fulfilled, (state, action)=>{
      state.loading = false;
      state.error = null;
      state.todaysWeatherData = action.payload;
      console.log("success");
      console.log(action.payload);
      
      
    })
    .addCase(todayWeather.rejected, (state, action)=>{
      state.loading = false;
      state.error = {
        message: action.payload?.message,
        code: action.payload?.code,
        status: action.payload?.status,
        statusText: action.payload?.statusText,
      };
      console.log("error");
      
    })

    //Weeks Weather
    .addCase(weekWeather.pending, (state)=>{
      state.loading = true;
      state.error = null;
      console.log("loading........");
    })
    .addCase(weekWeather.fulfilled, (state,action)=>{
      state.loading = false;
      state.error = null;
      state.weekWeatherData = action.payload;
      console.log("success");
    })
    .addCase(weekWeather.rejected, (state, action)=>{
      state.loading = false;
      state.error = {
        message: action.payload?.message,
        code: action.payload?.code,
        status: action.payload?.status,
        statusText: action.payload?.statusText,
      };
      console.log("error..........");
    })

    //Coords from City
    .addCase(coordsFromCity.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(coordsFromCity.fulfilled, (state, action)=>{
      state.loading = false;
      state.error = null;
      state.coords = {
        lat : action.payload.lat,
        lon : action.payload.lon,
      };
      console.log('successfully fetched coords from country');
    })
    .addCase(coordsFromCity.rejected, (state, action)=>{
      state.loading = false;
      state.error = {
        message: action.payload?.message,
        code: action.payload?.code,
        status: action.payload?.status,
        statusText: action.payload?.statusText,
      };
    })

    //Coords from Pin
    .addCase(coordsFromPin.pending, (state)=>{
      state.loading = true;
      state.error = null;
      console.log('getting coords from pincode');
      
    })
    .addCase(coordsFromPin.fulfilled, (state, action)=>{
      state.loading = false;
      state.error = null;
      state.coords = {
        lat : action.payload.lat,
        lon : action.payload.lon,
      }
      console.log('successfully fetched coords from pincode');
    })
    .addCase(coordsFromPin.rejected, (state, action)=>{
      state.loading = false;
      state.error = {
        message: action.payload?.message,
        code: action.payload?.code,
        status: action.payload?.status,
        statusText: action.payload?.statusText,
      };
      console.log('failed to fetch coords from pincode');
      
    })
  }
})

export const {changeCoords,
              changeLanguage,
              changeMode,
              changeTheme,
            } = setup.actions;

export default setup.reducer