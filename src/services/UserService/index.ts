"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

//  DONE DOMPLETED: get all users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/admin-user");
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

//. get user by id
export const getUserById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/users/admin-user/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete user by id
export const deleteUserById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/users/admin-user/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// change role
export const changeRole = async (id: string, role: any) => {
  try {
    const response = await axiosInstance.patch(`/users/change-role/${id}`, {
      role,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// change status
export const changeStatus = async (id: string, status: any) => {
  try {
    const response = await axiosInstance.patch(`/users/change-status/${id}`, {
      status,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

//  create user
export const createUser = async (data: any) => {
  try {
    const response = await axiosInstance.post("/users/admin-user", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

//  update user by id
export const updateUserById = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/users/admin-user/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
