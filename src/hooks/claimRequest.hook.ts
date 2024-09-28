import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { addClaimRequest, getReceivedClaimRequest } from "../services/ClaimRequest";

// register hook
export const useAddClaimRequest = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADD_CLAIM_REQUEST"],
    mutationFn: async (claimData) => await addClaimRequest(claimData),
    onSuccess: () => toast.success("Claim Request Successfully Sent"),
    onError: (error) => toast.error(error.message), // This will show the server message
  });
};

// get received claim request hook
export const useGetReceivedClaimRequest = () => {
  return useQuery({
    queryKey: ["RECEIVED_CLAIM_REQUEST"],
    queryFn: async () => await getReceivedClaimRequest(),
  });
};