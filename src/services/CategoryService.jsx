import * as http from "../common/http-common";

const URLAPI = `${process.env.REACT_APP_API_SERVER}/v1/category`;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}`);
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

export const search = async (keyword) => {
  try {
    const res = await http.get(`${URLAPI}?key=${keyword}`);
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
