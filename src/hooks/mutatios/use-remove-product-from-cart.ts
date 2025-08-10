import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseCartQueryKey } from "../queries/use-cart";
import { removeProdtFromCart } from "@/actions/remove-cart-product";

export const getRemoveProductFromCartMutationKey = (cartItemId: string) =>
  ["remove-cart-product", cartItemId] as const;

export const useRemoveProductFromCart = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getRemoveProductFromCartMutationKey(cartItemId),
    mutationFn: () => removeProdtFromCart({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};