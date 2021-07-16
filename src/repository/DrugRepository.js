import * as axios from "axios";
import ApiConfig from "./ApiConfig"

export async function findDrugs(query) {
  const response = await axios.get(`${ApiConfig.url}/api/products?q=${query}`);
  return response.data;
}

export async function createDrug(
  brandName,
  genericName,
  barcode,
  price,
  dosage,
) {
  const data = {brandName, genericName, barcode, price, dosage};
  console.log(data);

  return await axios.post(`${ApiConfig.url}/api/products`, data);
}

export async function deleteDrug(
  id,
) {
  return await axios.delete(`${ApiConfig.url}/api/products/${id}`);
}


export async function updateDrug(
  id,
  brandName,
  genericName,
  barcode,
  price,
  dosage,
) {
  const data = {brandName, dosage, barcode, price, genericName};
  console.log(data);

  return await axios.put(`${ApiConfig.url}/api/products/${id}`, data);
}
