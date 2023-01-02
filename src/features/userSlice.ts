/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addUser, UploadAvatar } from '../api/usersApi';
import { Avatar } from '../types/Avatar';
import { NewUser } from '../types/NewUser';

export interface CommentsState {
  error: string;
  submitting: boolean;
  newUser: NewUser | null;
  deletedUserId: string | null;
  errorNewUser: string;
  addedSucces: boolean;
}

const initialState: CommentsState = {
  error: '',
  submitting: false,
  newUser: null,
  deletedUserId: null,
  errorNewUser: '',
  addedSucces: false,
};

export const addNewUser = createAsyncThunk(
  'user/fetchCreate',
  (newUser: NewUser) => addUser(newUser),
);

export const AddAvatar = createAsyncThunk(
  'user/fetchCreateAvatar',
  (avatar: Avatar) => UploadAvatar(avatar),
);

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDeletedUserId: (state, action: PayloadAction<string>) => {
      state.deletedUserId = action.payload;
    },
    resetAddedSucces: (state) => {
      state.addedSucces = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {
        state.submitting = true;
        state.errorNewUser = '';
        state.addedSucces = false;
      })
      .addCase(addNewUser.fulfilled, (state) => {
        state.submitting = false;
        state.addedSucces = true;
      })
      .addCase(addNewUser.rejected, (state) => {
        state.errorNewUser = 'Something went wrong';
        state.submitting = false;
      });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
