import ProductListPage from "./components/pages/ProductListPage";
import CartProvider from "./context/CartProvider";
import { enableMapSet } from "immer"; // Import enableMapSet

enableMapSet(); // Call the function to enable Map and Set support

function App() {
  return (
    <CartProvider>
      <ProductListPage />
    </CartProvider>
  );
}

export default App;
