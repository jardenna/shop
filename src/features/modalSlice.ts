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
    toggleModal: (state, action: PayloadAction<string | null>) => {
      state.modalId = action.payload; // Set the modal ID to open
    },
  },
});

//

export const { toggleModal } = modalSlice.actions;
export const selectModalId = (state: RootState) => state.modal.modalId;
export default modalSlice.reducer;
