import { configureStore, combineReducers, Store, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { createWrapper, Context, MakeStore } from 'next-redux-wrapper';
import userReducer, { UserState } from './features/userSlice';
import profileReducer from './features/profileSlice';

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer
});

export const store = configureStore({
    reducer: rootReducer,
  });


//export type RootState = {
 // user: UserState;
 // profile: {
 //   profile: any;
 // };
//};
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
