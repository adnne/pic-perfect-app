import axiosInterceptor from '@/utils/axiosInterceptor';

export const generatedImagesService = {
  list: () => {
    return axiosInterceptor.get<API.Pagination<API.GenratedImage>>(`/photos/generated-photos/`,);
  },
  post: (data:API.GenratedImageForm) => {
    return axiosInterceptor.post<API.GenratedImage>(`/photos/generated-photos/`,data);
  },

};
