import styles from "./styles.module.scss";
import ListCard from "./ListCard";
import SingleCard from "./SingleCard";
import { IPost } from "@/types/IPost";
import { Button, Spin } from "antd";
import { ArrayParam, NumberParam, StringParam, useQueryParams, withDefault } from "use-query-params";

type SideListProps = {
  activeCard: IPost | null;
  setActiveCard: (card: IPost | null) => void;
  cards: IPost[];
  sideListTopMargin: number;
  isLoading: boolean;
}

export const SideList = (sideListProps: SideListProps) => {
  const {
    activeCard,
    setActiveCard,
    cards,
    sideListTopMargin,
    isLoading
  } = sideListProps;

  const [query, setQuery] = useQueryParams({
    text: withDefault(StringParam, null),
    page: withDefault(NumberParam, 1),
    tags: withDefault(ArrayParam, []),
    selectedPostId: StringParam,
  });

  return (
    <>
      <div
        className={`${styles.sideList} ${activeCard && styles.noBorderPadding
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
              {isLoading ? (
                <Spin className="w-full h-60 grid place-content-center" />
              ) : null}

              {!isLoading && !cards?.length ? (
                  <div className="flex justify-center">
                    <Button
                      type={"default"}
                      onClick={() =>
                        setQuery({ tags: null as unknown as string[] }, "replace")
                      }
                      className="max-w-min absolute top-1/2"
                    >
                      Clear Filter
                    </Button>
                  </div>
              ) : cards?.map((card, i) => (
                <ListCard
                  key={`${card.address}-${i}`}
                  card={card}
                  setActiveCard={setActiveCard}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
