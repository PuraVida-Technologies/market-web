import styles from "./styles.module.scss";
import ListCard from "./ListCard";
import SingleCard from "./SingleCard";
import { IPost } from "@/types/IPost";

export const SideList = ({
  activeCard,
  setActiveCard,
  cards,
  sideListTopMargin,
}: {
  activeCard: IPost | null;
  setActiveCard: (card: IPost | null) => void;
  cards: IPost[];
  sideListTopMargin: number;
}) => {
  return (
    <>
      <div
        className={`${styles.sideList} ${
          activeCard && styles.noBorderPadding
        } h-[77vh] `}
        style={{ top: `${sideListTopMargin}px ` }}>
        {activeCard ? (
          <SingleCard {...{ activeCard, setActiveCard }} />
        ) : (
          <div>
            <div className={styles.header}>
              <h4>Latest Posts</h4>
              <div className={styles.location}></div>
            </div>
            <div className={styles.sideCardsContainer}>
              {cards?.map((card, i) => (
                <ListCard
                  key={`${card.address}-${i}`}
                  {...{ card, setActiveCard }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {activeCard ? (
        <div
          className={`${styles.sideList} ${
            activeCard && styles.noBorderPadding
          } ${styles.mobileSingleCard}`}
          style={{ top: `${0}px` }}>
          <SingleCard {...{ activeCard, setActiveCard }} />
        </div>
      ) : (
        <div className={`bottomSliderList ${styles.bottomSliderList}`}>
          <div className="flex gap-3 overflow-x-auto px-3">
            {cards?.map((card, i) => (
              <ListCard
                key={`${card.address}-${i}`}
                {...{ card, setActiveCard }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
