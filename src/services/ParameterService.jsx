import * as http from "../common/http-common";

const URLAPI = `${process.env.REACT_APP_API_SERVER}/v1/parameter`;

export const search = async (query) => {
  try {
    const res = await http.search(`${URLAPI}/search`, query);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (id) => {
  try {
    const res = await http.get(`${URLAPI}/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const update = async (id, data) => {
  try {
    const res = await http.put(`${URLAPI}/${id}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
