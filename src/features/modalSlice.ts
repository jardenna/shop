import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ModalState {
  modalId: string | null;
}

const initialState: ModalState = {
  modalId: null,
};

const testmodalSlice = createSlice({
  name: 'testmodalSlice',
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

export const { openModal, closeModal } = testmodalSlice.actions;

export default testmodalSlice.reducer;
