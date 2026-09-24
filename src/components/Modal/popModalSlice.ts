import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface PopModalState {
  modalId: string | null;
}

const initialState: PopModalState = {
  modalId: null,
};

const popModalSlice = createSlice({
  name: 'popModalSlice',
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

export const selectModalId = (state: RootState) => state.popModal.modalId;

export const { openModal, closeModal } = popModalSlice.actions;

export default popModalSlice.reducer;
