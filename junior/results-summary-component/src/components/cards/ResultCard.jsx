import { useEffect } from "react";
import { useImmer } from "use-immer";
import styles from "./ResultCard.module.scss";
import Button from "../buttons/Button";
import * as Icons from "../icons";
const ResultCard = () => {
  const [data, updateData] = useImmer({
    isLoading: false,
    error: null,
    items: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      updateData((draft) => {
        draft.isLoading = true;
      });

      try {
        const response = await fetch("./data.json");
        if (!response.ok) {
          updateData((draft) => {
            draft.error = `HTTP error! status: ${response.status}`;
          });
        }

        let json = await response.json();
        updateData((draft) => {
          draft.items = json;
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
  }, []);

  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles["result-wrapper"]}>
        <p className={styles["result-title"]}>Your Result</p>
        <div className={styles["score-wrapper"]}>
          <p>76</p>
          <p>of 100</p>
        </div>
        <div className={styles["description-wrapper"]}>
          <p>Great</p>
          <p>
            You scored higher than 65% of the people who have taken these tests.
          </p>
        </div>
      </div>
      <div className={styles["summary-wrapper"]}>
        <p className={styles["summary-title"]}>Summary</p>
        <div className={styles["summary-items-wrapper"]}>
          {data.items.map((item) => (
            <SumItem key={item.category} item={item} />
          ))}
        </div>
        <Button text="Continue" className={styles["btn"]} />
      </div>
    </div>
  );
};

const SumItem = ({ item }) => {
  let icon = null;
  switch (item.category) {
    case CATEGORIES.reaction:
      icon = <Icons.FlashIcon width={20} height={20} />;
      break;
    case CATEGORIES.memory:
      icon = <Icons.BrainIcon width={20} height={20} />;
      break;
    case CATEGORIES.verbal:
      icon = <Icons.ChatIcon width={20} height={20} />;
      break;
    case CATEGORIES.visual:
      icon = <Icons.EyeIcon width={20} height={20} />;
      break;
  }

  return (
    <div
      className={[
        styles["sum-item"],
        styles[`sum-item--${item.category.toLowerCase()}`],
      ].join(" ")}
    >
      <div className={styles["category-wrapper"]}>
        {icon}
        <span>{item.category}</span>
      </div>
      <div className={styles["score-wrapper"]}>
        <span>{item.score}</span>
        <span>/ 100</span>
      </div>
    </div>
  );
};

// Available button styles.
const CATEGORIES = {
  reaction: "Reaction",
  memory: "Memory",
  verbal: "Verbal",
  visual: "Visual",
};

export default ResultCard;
