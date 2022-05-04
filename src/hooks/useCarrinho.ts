import { useContext } from "react";
import { CartContext } from "../contexts/carrinho";

export default function useCarrinho() {
  return useContext(CartContext)
}