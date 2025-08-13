import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { useCart } from "../../context/CartContext";
import Cart from "../cards/Cart";
import ProductCard from "../cards/ProductCard";
import ConfirmModal from "../modals/ConfirmModal";
import styles from "./ProductListPage.module.scss";

const ProductListPage = () => {
  const [data, updateData] = useImmer({
    isLoading: false,
    error: null,
    products: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { itemMap, resetCart } = useCart();

  useEffect(() => {
    // We define an async function inside useEffect
    // because useEffect itself cannot be async.
    const fetchData = async () => {
      updateData((draft) => {
        draft.isLoading = true;
      });

      try {
        const response = await fetch("./data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let json = await response.json();
        updateData((draft) => {
          draft.products = json;
          draft.error = null;
        });
      } catch (e) {
        updateData((draft) => {
          draft.error = e.message;
        });
      } finally {
        updateData((draft) => {
          draft.isLoading = false;
        });
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once

  // Conditional rendering based on state
  if (data.isLoading) {
    return <div>Loading data...</div>;
  }

  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  const handleReset = () => {
    resetCart();
    setIsModalOpen(false);
  };

  return (
    <>
      <main className={styles["main"]}>
        <section className={styles["section-product-list"]}>
          <h2 className="text-preset1 color-text-main">Desserts</h2>
          <div className={styles["products-wrapper"]}>
            {data.products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </section>
        <Cart
          className={styles["section-cart"]}
          items={data.products
            .filter((product) => itemMap.has(product.id))
            .map((product) => {
              return {
                ...product,
                quantity: itemMap.get(product.id),
              };
            })}
          onConfirm={() => {
            setIsModalOpen(true);
          }}
        />
      </main>
      {isModalOpen && (
        <ConfirmModal
          items={data.products
            .filter((product) => itemMap.has(product.id))
            .map((product) => {
              return {
                ...product,
                quantity: itemMap.get(product.id),
              };
            })}
          onReset={handleReset}
        />
      )}
    </>
  );
};

const PRODUCT_QUANTITY_CHANGE = {
  up: "up",
  down: "down",
  reset: "reset",
};

export default ProductListPage;
