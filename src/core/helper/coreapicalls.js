import { API } from '../../config';
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
