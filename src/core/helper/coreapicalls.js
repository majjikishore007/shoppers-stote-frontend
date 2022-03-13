import { API } from '../../config';
console.log("Api ",API);
export const getAllProducts = () => {
  console.log('get all products calls');
  return fetch(`${API}/products`, {
    method: 'GET',
  })
    .then((response) => {
      console.log("RES: " + response.json);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
