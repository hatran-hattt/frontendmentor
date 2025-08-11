import { useContext } from "react";
import CartContext from "./CartContext";

// Create a custom hook for easy consumption
const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default useCart;
