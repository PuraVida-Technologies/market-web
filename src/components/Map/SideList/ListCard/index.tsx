/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Image from "next/image";
import { CardType } from "@/types/Card";
import styles from "./styles.module.scss";

const ListCard = ({ card, setActiveCard }: { card: CardType; setActiveCard: (card: CardType) => void }) => {
  const { name, location, description, mainImageUrl } = card;

  return (
    <div className={styles.listCard} onClick={() => setActiveCard(card)}>
      <div className={styles.imageContainer}>
        <Image src={mainImageUrl || "/assets/icons/infoWindowImg.svg"} fill alt="card" />
      </div>
      <div className={styles.infoContainer}>
        <h4>{name.slice(0, 20)}</h4>
        <div className={styles.review}></div>
        <div className={styles.content}>
          <p>{description.slice(0, 50)}</p>
        </div>
        <div className={styles.cta}>
          <button onClick={(e) => e.stopPropagation()}>
            <a
              href={`https://maps.google.com/?q=${location.coordinates[0]},${location.coordinates[1]}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/assets/icons/send.svg" width={11} height={14} alt="direction" />
              <span>Direction</span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
