import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
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

  useEffect(() => {
    // We define an async function inside useEffect
    // because useEffect itself cannot be async.
    const fetchData = async () => {
      updateData((draft) => {
        draft.isLoading = true;
      });

      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let json = await response.json();
        json = json.map((product) => {
          product.quantity = 0;
          return product;
        });
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

  const handleProductQuantity = (productId, quantityChange) => {
    if (!data.products.some((product) => product.id === productId)) {
      return;
    }

    updateData((draft) => {
      const targetProduct = draft.products.find(
        (product) => product.id === productId
      );
      switch (quantityChange) {
        case PRODUCT_QUANTITY_CHANGE.up:
          targetProduct.quantity += 1;
          break;
        case PRODUCT_QUANTITY_CHANGE.down:
          if (targetProduct.quantity > 0) {
            targetProduct.quantity -= 1;
          }
          break;
        case PRODUCT_QUANTITY_CHANGE.reset:
          targetProduct.quantity = 0;
          break;
      }
    });
  };

  const handleReset = () => {
    updateData((draft) => {
      draft.products.forEach((product) => {
        product.quantity = 0;
      });
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <main className={styles["main"]}>
        <section className={styles["section-product-list"]}>
          <h2 className="text-preset1 color-text-main">Desserts</h2>
          <div className={styles["products-wrapper"]}>
            {data.products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuantityUp={() =>
                    handleProductQuantity(
                      product.id,
                      PRODUCT_QUANTITY_CHANGE.up
                    )
                  }
                  onQuantityDown={() =>
                    handleProductQuantity(
                      product.id,
                      PRODUCT_QUANTITY_CHANGE.down
                    )
                  }
                />
              );
            })}
          </div>
        </section>
        <Cart
          className={styles["section-cart"]}
          items={data.products.filter((product) => product.quantity > 0)}
          onRemoveItem={(productId) =>
            handleProductQuantity(productId, PRODUCT_QUANTITY_CHANGE.reset)
          }
          onConfirm={() => {
            setIsModalOpen(true);
          }}
        />
      </main>
      {isModalOpen && (
        <ConfirmModal
          items={data.products.filter((product) => product.quantity > 0)}
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
