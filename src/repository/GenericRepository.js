import * as axios from "axios";
import ApiConfig from "./ApiConfig"

export async function findGenerics(query="") {
  const response = await axios.get(`${ApiConfig.url}/api/generics?q=${query}`);
  return response.data;
}

export async function createGeneric(genericName) {
  const data = {
    genericName
  }

  return await axios.post(`${ApiConfig.url}/api/generics`, data);
}

export async function deleteGeneric(
  id,
) {
  return await axios.delete(`${ApiConfig.url}/api/generics/${id}`);
}


export async function updateGeneric(
  id,
  genericName
) {
  const data = {
    genericName
  }

  return await axios.put(`${ApiConfig.url}/api/generics/${id}`, data);
}
