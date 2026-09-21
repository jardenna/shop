import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface PopModalState {
  isOpen: boolean;
  modalId: string | null;
}

const initialState: PopModalState = {
  isOpen: false,
  modalId: null,
};

const popModalSlice = createSlice({
  name: 'popModalSlice',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string | null>) => {
      state.isOpen = true;
      state.modalId = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalId = null;
    },
  },
});

export const selectIsModalOpen = (state: RootState) =>
  state.popModalIsOpen.isOpen;

export const selectModalId = (state: RootState) => state.popModalIsOpen.modalId;

export const { openModal, closeModal } = popModalSlice.actions;

export default popModalSlice.reducer;
