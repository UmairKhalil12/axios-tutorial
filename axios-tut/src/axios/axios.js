import axios from 'axios';

const getAllData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api');
    // console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log('error getting data', error.message);
  }
}

const addProduct = async (newProduct) => {
  try {
    const repsonse = await axios.post('http://localhost:3001/api', newProduct);
    console.log(repsonse.data);
    return repsonse.data;
  }
  catch (error) {
    console.log(error.message);
  }
}

const updateProduct = async (productDetails, id) => {
  try {
    console.log('update product', productDetails);
    const response = await axios.put(`http://localhost:3001/api/${id}`, productDetails);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error.message);
  }
}

const deleteProduct = async (id) => {
  try {
    console.log(id)
    const response = await axios.delete(`http://localhost:3001/api/${id}`);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error.message);
  }
}

const getDataById = async (id) => {
  try {
    console.log(id);
    const response = await axios.get(`http://localhost:3001/api/${id}`);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error.message);
  }
}

export { getAllData, updateProduct, addProduct, deleteProduct, getDataById }

