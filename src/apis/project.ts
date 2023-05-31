import apiRequest from '.';

const RESOURCE = '/api/projects';

export const createProject = async (formData: FormData) => {
  try {
    const testLoginToken =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZW1haWxAZ21haWwuY29tIiwidXNlcklkIjo0LCJleHAiOjE2ODU1NzA5MTAsImlhdCI6MTY4NTU2NzMxMH0.TbTbmBgT9slKinGyIzoYLPleslNGbmosWBgd6sg6lXM';
    const response = await apiRequest.post(RESOURCE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: testLoginToken,
      },
    });

    return response.data.data;
  } catch (error) {
    return error;
  }
};
