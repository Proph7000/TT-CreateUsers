/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NewFormUserState {
  name: string;
  email: string;
  surname: string;
  phone: string;
  birthdate: string;
  preview: string;
  isEmptyName: boolean;
  isEmptyEmail: boolean;
  isEmptyPhone: boolean;
}

const initialState: NewFormUserState = {
  name: '',
  email: '',
  surname: '',
  phone: '',
  birthdate: '',
  preview: '',
  isEmptyName: true,
  isEmptyEmail: true,
  isEmptyPhone: true,
};

export const newUserSlice = createSlice({
  name: 'newUser',
  initialState,
  reducers: {
    addingName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addingEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    addingSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
    },
    addingPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    addingBirthdate: (state, action: PayloadAction<string>) => {
      state.birthdate = action.payload;
    },
    setPreview: (state, action: PayloadAction<string>) => {
      state.preview = action.payload;
    },
    setIsEmptyName: (state, action: PayloadAction<boolean>) => {
      state.isEmptyName = action.payload;
    },
    setIsEmptyEmail: (state, action: PayloadAction<boolean>) => {
      state.isEmptyEmail = action.payload;
    },
    setIsEmptyPhone: (state, action: PayloadAction<boolean>) => {
      state.isEmptyPhone = action.payload;
    },
    clearForm: (state) => {
      state.surname = '';
      state.email = '';
      state.name = '';
      state.phone = '';
      state.birthdate = '';
      state.preview = '';
      state.isEmptyName = true;
      state.isEmptyEmail = true;
      state.isEmptyPhone = true;
    },
  },
});

export default newUserSlice.reducer;
export const { actions } = newUserSlice;
