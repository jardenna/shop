import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

type ModalState = {
  modalId: string | null;
};

const initialState: ModalState = {
  modalId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<string | null>) => {
      state.modalId = action.payload; // Set the modal ID to open
    },
    closeModal: (state) => {
      state.modalId = null;
    },
  },
});

export const { toggleModal, closeModal } = modalSlice.actions;
export const selectModalId = (state: RootState) => state.modal.modalId;
export default modalSlice.reducer;
