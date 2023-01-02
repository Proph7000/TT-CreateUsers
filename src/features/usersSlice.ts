/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteAvatar, deleteUser, getUsers } from '../api/usersApi';
import { UserFromServer } from '../types/UserFromServer';

export interface UsersState {
  users: UserFromServer[];
  loading: boolean;
  error: string;
  submitting: boolean;
  currentUserId: string;
  deletedUserId: string;
  deleting: boolean;
  isAdded: boolean;
}

const initialState: UsersState = {
  users: [],
  currentUserId: '',
  loading: false,
  error: '',
  submitting: false,
  deletedUserId: '',
  deleting: false,
  isAdded: true,
};

export const initUsers = createAsyncThunk(
  'users/fetchLoad',
  () => getUsers(),
);

export const removeUser = createAsyncThunk(
  'users/fetchRemove',
  (id: string) => deleteUser(id),
);

export const removeAvatar = createAsyncThunk(
  'users/fetchRemoveAvatar',
  (ref: string) => deleteAvatar(ref),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUserId: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload;
    },
    setDeletedUserId: (state, action: PayloadAction<string>) => {
      state.deletedUserId = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserFromServer[]>) => {
      state.users = action.payload;
    },
    setIsAdded: (state, action: PayloadAction<boolean>) => {
      state.isAdded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(initUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(initUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Error';
      })
      .addCase(removeUser.pending, (state) => {
        state.deleting = true;
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.users = state.users.filter(
          user => user.id !== state.deletedUserId,
        );
        state.deleting = false;
        state.deletedUserId = '';
      })
      .addCase(removeUser.rejected, (state) => {
        state.deleting = false;
      });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
