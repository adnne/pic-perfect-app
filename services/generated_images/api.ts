import axiosInterceptor from '@/utils/axiosInterceptor';

export const generatedImagesService = {
  list: () => {
    return axiosInterceptor.get<API.Pagination<API.GenratedImage>>(`/photos/generated-photos/`,);
  },
  post: (data:API.GenratedImageForm) => {
    
    const formData = new FormData();
    formData.append('input_image', {
      uri: data.input_image,
      name: 'image.jpg',
      type: 'image/jpeg',
    } as any);
    formData.append('prompt', data.prompt);
    return axiosInterceptor.post<API.GenratedImageResponse>(`/photos/generated-photos/`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

};
