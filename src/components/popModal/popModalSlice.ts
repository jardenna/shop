import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface PopModalState {
  isOpen: boolean;
}

const initialState: PopModalState = {
  isOpen: false,
};

const popModalSlice = createSlice({
  name: 'popModalSlice',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectIsModalOpen = (state: RootState) =>
  state.popModalIsOpen.isOpen;

export const { openModal, closeModal } = popModalSlice.actions;

export default popModalSlice.reducer;
