import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ModalState {
  modalId: string | null;
}

const initialState: ModalState = {
  modalId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string | null>) => {
      state.modalId = action.payload;
    },
    closeModal: (state) => {
      state.modalId = null;
    },
  },
});

export const selectModalId = (state: RootState) => state.modal.modalId;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
