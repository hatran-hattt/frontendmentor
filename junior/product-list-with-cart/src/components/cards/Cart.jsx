import { useCart } from "../../context/CartContext";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import { RemoveIcon, CarbonTreeIcon } from "../icons";
import placeholderImg from "../../assets/images/illustration-empty-cart.svg";
import styles from "./Cart.module.scss";

const Cart = ({ items, className, onConfirm }) => {
  const { removeItem } = useCart();

  if (!items || items.length == 0) {
    return <EmptyCart />;
  }

  // Format currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let sumQuantity = 0;
  let total = 0;
  let cartItems = items.map((item, index) => {
    sumQuantity += item.quantity;
    total += item.quantity * item.price;
    return (
      <CartItem
        key={item.id}
        itemInfo={item}
        showSeparator={index < items.length - 1}
        onRemove={() => {
          removeItem(item.id);
        }}
      />
    );
  });
  return (
    <section className={[styles["cart"], className].filter(Boolean).join(" ")}>
      <h2 className="text-preset2 color-text-accent">
        Your Cart({sumQuantity})
      </h2>
      <div className={styles["items-wrapper"]}>{cartItems}</div>
      <hr className={styles["separator"]} />
      <div className={styles["total-wrapper"]}>
        <p className="text-preset4 color-text-main">Order Total</p>
        <p className="text-preset2 color-text-main">
          {formatter.format(total)}
        </p>
      </div>
      <div className={styles["carbon-neutral-info-wrapper"]}>
        <CarbonTreeIcon color="var(--color-icon-carbon-tree)" />
        <p className="text-preset4 color-text-main">
          This is a <strong>carbon-neutral</strong> delivery
        </p>
      </div>
      <Button
        type="button"
        text="Confirm Order"
        className="full-width"
        btnStyle="primary"
        style={{ paddingBlock: "var(--space-s)" }}
        onClick={onConfirm}
      />
    </section>
  );
};

const EmptyCart = () => {
  return (
    <section className={styles["empty-cart"]}>
      <h2 className="text-preset2 color-text-accent">Your Cart(0)</h2>
      <div className={styles["placeholder-wrapper"]}>
        <img alt="" src={placeholderImg} />
        <p className="text-preset4-bold color-text-subtle">
          Your added items will appear here
        </p>
      </div>
    </section>
  );
};

const CartItem = ({ itemInfo, showSeparator, onRemove }) => {
  // Format currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <div className={styles["cart-item"]}>
        <div className={styles["info-wrapper"]}>
          <h3 className="text-preset4-bold color-text-main">{itemInfo.name}</h3>
          <div className={styles["info__price"]}>
            <span className="text-preset4-bold color-text-accent">
              {`${itemInfo.quantity}x`}
            </span>
            <span className="text-preset4 color-text-subtle">
              @ {formatter.format(itemInfo.price)}
            </span>
            <span className="text-preset4-bold color-text-subtle">
              {formatter.format(itemInfo.price * itemInfo.quantity)}
            </span>
          </div>
        </div>
        <IconButton
          type="button"
          shape="round"
          size="var(--space-m)"
          color="var(--color-icon-remove)"
          icon={<RemoveIcon />}
          onClick={onRemove}
        />
      </div>
      {showSeparator && <hr className={styles["separator"]} />}
    </>
  );
};

export default Cart;
