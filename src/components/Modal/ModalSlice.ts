import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface ModalState {
  modalId: string | null;
}

const initialState: ModalState = {
  modalId: null,
};

const ModalSlice = createSlice({
  name: 'ModalSlice',
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

export const selectModalId = (state: RootState) => state.Modal.modalId;

export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;
