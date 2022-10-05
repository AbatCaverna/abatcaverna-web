import { useContext } from "react";
import { AlertContext } from "contexts/alert";

export default function useAlert() {
  return useContext(AlertContext)
}