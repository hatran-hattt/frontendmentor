import ResponsiveImage from "../images/ResponsiveImage";
import Button from "../buttons/Button";
import QuantityStepper from "../buttons/QuantityStepper";
import { AddToCartIcon } from "../icons";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product, onQuantityUp, onQuantityDown }) => {
  // Format currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <article
      className={`${styles["card"]} ${
        product.quantity > 0 ? styles["card--selected"] : ""
      }`}
    >
      <div className={styles["card-hero-wrapper"]}>
        <ResponsiveImage
          mobileSrc={product.image.mobile}
          tabletSrc={product.image.tablet}
          desktopSrc={product.image.desktop}
          alt={product.name}
        />
        {product.quantity > 0 ? (
          <QuantityStepper
            currentQuantity={product.quantity}
            className="text-preset4-bold"
            onSubtract={onQuantityDown}
            onAdd={onQuantityUp}
          />
        ) : (
          <Button
            type="button"
            icon={<AddToCartIcon />}
            text="Add to Cart"
            btnStyle="secondary"
            className="text-preset4-bold"
            onClick={onQuantityUp}
          />
        )}
      </div>
      <div className={styles["card-info-wrapper"]}>
        <p
          className="text-preset4 color-text-subtle"
          // className={styles["info__category"]}
        >
          {product.category}
        </p>
        <h3 className="text-preset3 color-text-main">{product.name}</h3>
        <p className="text-preset3 color-text-accent">
          {formatter.format(product.price)}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
