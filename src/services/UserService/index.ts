"use server";

// GET       /users/admin-user
// GET      /users/admin-user/:id
// DELETE  /users/admin-user/:id
// PATCH  /users/change-role/:id
// PATCH /users/change-status/:id
// POST /users/admin-user
// PUT /users/admin-user/:id

import axiosInstance from "@/src/lib/AxiosInstance";

//  DONE DOMPLETED: get all users
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users/admin-user");
  return response.data;
};

//. get user by id
export const getUserById = async (id: string) => {
  const response = await axiosInstance.get(`/users/admin-user/${id}`);
  return response.data;
};

// TODO. delete user by id
export const deleteUserById = async (id: string) => {
  const response = await axiosInstance.delete(`/users/admin-user/${id}`);
  return response.data;
};

// TODO. change role
export const changeRole = async (id: string, data: any) => {
  const response = await axiosInstance.patch(`/users/change-role/${id}`, data);
  return response.data;
};

// TODO. change status
export const changeStatus = async (id: string, data: any) => {
  const response = await axiosInstance.patch(
    `/users/change-status/${id}`,
    data
  );
  return response.data;
};

// TODO. create user
export const createUser = async (data: any) => {
  const response = await axiosInstance.post("/users/admin-user", data);
  return response.data;
};

// TODO. update user by id
export const updateUserById = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/users/admin-user/${id}`, data);
  return response.data;
};
