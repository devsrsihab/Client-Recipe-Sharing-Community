'use server'
import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

// add claim request
export const addClaimRequest = async (formData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/claim-request", formData);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get received claim request
export const getReceivedClaimRequest = async () => {
  try {
    const res = await axiosInstance.get(
      "/claim-request/received-claim-request"
    );

    return res.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch data");
  }
};