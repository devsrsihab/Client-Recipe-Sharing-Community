"use server";
import axiosInstance from "@/src/lib/AxiosInstance";

// get recipe details
export const paymentRedirect = async (email: string) => {
  try {
    const res = await axiosInstance.post("/payment", {
      userEmail: email,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
