import { useEffect } from "react";
import styles from "./ScrollableModal.module.scss";

const ScrollableModal = ({ containerStyle, renderContent }) => {
  // This useEffect hook runs when the component mounts and unmounts
  useEffect(() => {
    // Disable body scroll when the modal is open
    document.body.style.overflow = "hidden";

    // Cleanup function to re-enable body scroll when the modal closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Empty dependency array means this runs only on mount/unmount

  return (
    <div className={styles["modal-overlay"]}>
      <div
        className={[styles["modal-container"], containerStyle]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {renderContent({
          notScrollableAreaStyle: styles["modal-content-not-scrollable"],
          scrollableAreaStyle: styles["modal-content-scrollable"],
        })}
      </div>
    </div>
  );
};

export default ScrollableModal;
