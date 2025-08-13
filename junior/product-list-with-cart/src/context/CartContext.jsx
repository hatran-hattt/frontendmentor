import { createContext, useContext } from "react";
import { useImmer } from "use-immer";
// import CartContext from "./CartContext";

// 1. Create context
const CartContext = createContext(null);

// 2. Create a Provider component to wrap your app or a section of it
export const CartProvider = ({ children }) => {
  const [itemMap, updateItemMap] = useImmer(new Map());

  // Action: Add an item in the cart
  const addItem = (itemId) => {
    updateItemMap((draft) => {
      if (!draft.has(itemId)) {
        draft.set(itemId, 1);
      }
    });
  };

  // Action: Remove an item from the cart
  const removeItem = (itemId) => {
    updateItemMap((draft) => {
      draft.delete(itemId);
    });
  };

  // Action: Increment an item's quantity
  const upQuantity = (itemId) => {
    updateItemMap((draft) => {
      if (draft.has(itemId)) {
        draft.set(itemId, draft.get(itemId) + 1);
      }
    });
  };

  // Action: Decrement an item's quantity, removing it if quantity drops to 0
  const downQuantity = (itemId) => {
    updateItemMap((draft) => {
      if (draft.has(itemId)) {
        let currentQuantity = draft.get(itemId);
        if (currentQuantity <= 1) {
          draft.delete(itemId);
        } else {
          draft.set(itemId, currentQuantity - 1);
        }
      }
    });
  };

  // Action: Reset the entire cart
  const resetCart = () => {
    updateItemMap((draft) => {
      draft.clear();
    });
  };

  const contextValue = {
    itemMap,
    addItem,
    removeItem,
    upQuantity,
    downQuantity,
    resetCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// 3. Create a custom hook for easy consumption
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
