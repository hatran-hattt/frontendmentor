import { CheckMarkIcon } from "../icons";
import Button from "../buttons/Button";
import ScrollableModal from "./ScrollableModal";
import styles from "./ConfirmModal.module.scss";

// Format currency
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ConfirmModal = ({ items, onReset }) => {
  let total = 0;
  let confirmItems = items.map((item, index) => {
    total += item.quantity * item.price;
    return (
      <ConfirmItem
        key={item.id}
        itemInfo={item}
        showSeparator={index < items.length - 1}
      />
    );
  });
  return (
    <ScrollableModal
      containerStyle={styles["modal-container"]}
      renderContent={(contentProps) => (
        <>
          <header className={styles["title-wrapper"]}>
            <CheckMarkIcon color="var(--color-icon-check-mark)" />
            <h2 className="text-preset1 color-text-main">Order Confirmed</h2>
            <p className="text-preset5 color-text-subtle">
              We hope you enjoy your food!
            </p>
          </header>
          <div
            className={[
              styles["confirm-items-wrapper"],
              contentProps.scrollableAreaStyle,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div
              className={[styles["confirm-items"]].filter(Boolean).join(" ")}
            >
              {confirmItems}
            </div>
            <hr className={styles["separator"]} />
            <div className={styles["total-wrapper"]}>
              <p className="text-preset4 color-text-main">Order Total</p>
              <p className="text-preset2 color-text-main">
                {formatter.format(total)}
              </p>
            </div>
          </div>
          <Button
            type="button"
            text="Start New Order"
            className="full-width"
            btnStyle="primary"
            style={{ paddingBlock: "var(--space-s)" }}
            onClick={onReset}
          />
        </>
      )}
    />
  );
};

const ConfirmItem = ({ itemInfo, showSeparator }) => {
  return (
    <>
      <div className={styles["confirm-item-wrapper"]}>
        <div className={styles["info-wrapper"]}>
          <img
            className={styles["thumbnail"]}
            alt=""
            src={itemInfo.image.thumbnail}
          />
          <div className={styles["name-quantity-wrapper"]}>
            <h3 className="text-preset4-bold color-text-main">
              {itemInfo.name}
            </h3>
            <div className={styles["quantity-wrapper"]}>
              <span className="text-preset4-bold color-text-accent">
                {`${itemInfo.quantity}x`}
              </span>
              <span className="text-preset4 color-text-subtle">
                @ {formatter.format(itemInfo.price)}
              </span>
            </div>
          </div>
        </div>
        <p>{formatter.format(itemInfo.price * itemInfo.quantity)}</p>
      </div>
      {showSeparator && <hr className={styles["separator"]} />}
    </>
  );
};

export default ConfirmModal;
