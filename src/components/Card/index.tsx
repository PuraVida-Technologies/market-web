/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CardType } from "@/types/Card";
import Image from "next/image";
import styles from "./styles.module.scss";

type CardProps = {
  card: CardType;
  setActiveCard: (card: CardType) => void;
};

export default function Card({ card, setActiveCard }: CardProps) {
  const { mainImageUrl, name, description } = card;
  return (
    <div className={styles.card} onClick={() => setActiveCard(card)}>
      <div className={styles.imageContainer}>
        <Image src={mainImageUrl} fill alt="post" className={styles.image} />
      </div>
      <div className={styles.textSection}>
        <p className={styles.address}>{name?.slice(0, 20)}</p>
        <p className={styles.description}>{description?.slice(0, 100)}</p>
      </div>
    </div>
  );
}
