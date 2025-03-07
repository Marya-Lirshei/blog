import { /* combineReducers, */ configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import authSlice from "./reducers/authSlice";


// const rootReducer = combineReducers({
//     auth: authSlice,
// })

// export const setupStore = () =>{
//     return configureStore({
//         reducer: rootReducer
//     })
// }

// export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']