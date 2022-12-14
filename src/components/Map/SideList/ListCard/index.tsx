import Image from "next/image";
import { CardType } from "@/types/Card";
import styles from "./styles.module.scss";

const ListCard = ({
  card,
  setActiveCard,
}: {
  card: CardType;
  setActiveCard: (card: CardType) => void;
}) => {
  const { distance, name, location } = card;

  return (
    <div className={styles.listCard} onClick={() => setActiveCard(card)}>
      <div className={styles.imageContainer}>
        <Image src="/assets/icons/infoWindowImg.svg" fill alt="card" />
      </div>
      <div className={styles.infoContainer}>
        <h4>{name}</h4>
        <div className={styles.address}>
          <Image
            src="/assets/icons/addressArrow.svg"
            width={10}
            height={10}
            alt="distance"
          />
          <span>{distance}</span>
        </div>
        <div className={styles.review}></div>
        <div className={styles.content}>
          <p>Burgers - Italian - Hot vine - Grilled - Canadian</p>
        </div>
        <div className={styles.cta}>
          <button onClick={(e) => e.stopPropagation()}>
            <a
              href={`https://maps.google.com/?q=${location.coordinates[0]},${location.coordinates[1]}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/assets/icons/send.svg"
                width={11}
                height={14}
                alt="direction"
              />
              <span>Direction</span>
            </a>
          </button>
          <button onClick={(e) => e.stopPropagation()}>
            <Image
              src="/assets/icons/shape.svg"
              width={8}
              height={12}
              alt="save"
            />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
