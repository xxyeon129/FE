export const accessToken = localStorage.getItem('accesstoken');
export const refreshToken = localStorage.getItem('refreshtoken');

export const getAccessToken = () => {
  return new Promise(resolve => resolve(localStorage.getItem('accesstoken')));
};

export const getRefreshToken = () => {
  return new Promise(resolve => resolve(localStorage.getItem('refreshtoken')));
};
