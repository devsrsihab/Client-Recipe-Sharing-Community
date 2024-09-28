"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// login user service
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// login out user service
export const logOutUser = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

// get user service
export const getCurrentuser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken?._id,
      name: decodedToken?.name,
      email: decodedToken?.email,
      role: decodedToken?.role,
      mobileNumber: decodedToken?.mobileNumber,
      profilePhoto: decodedToken?.profilePhoto,
      status: decodedToken?.status,
    };
  }
  return decodedToken;
};


// refresh token service
export const getNewAccessToken = async () => {

try {
    const refreshToken = cookies().get("refreshToken")?.value;
  const { data } = await axiosInstance({
    method: "POST",
    url: "/auth/refresh-token",
    withCredentials: true,
    headers: {
      "cookie": `refreshToken=${refreshToken}`
    }
  })
  return data;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

