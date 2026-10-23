import apiSlice, { MethodsEnum } from '../app/api/apiSlice';
import { UploadResponse } from '../app/api/apiTypes/adminApiTypesNew';

export const uploadImageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: MethodsEnum.Post,
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadImageApiSlice;
