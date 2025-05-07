import apiSlice from '../app/api/apiSlice';
import { UploadResponse } from '../app/api/apiTypes';

export const uploadImageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadImageApiSlice;
