import { useMutation } from "@tanstack/react-query";
import { paymentRedirect } from "../services/Payment";
import { toast } from "sonner";

//  get all users
export const usePaymentRedirect = () => {
  return useMutation({
    mutationFn: async (email: string) => await paymentRedirect(email),
    onSuccess: (data) => {
      window.location.href = data.data.payment_url;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
