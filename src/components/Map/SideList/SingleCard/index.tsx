/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Image from "next/image";
import { CardType } from "@/types/Card";
import styles from "./styles.module.scss";

const SingleCard = ({ activeCard, setActiveCard }: { activeCard: CardType; setActiveCard: (card: null) => void }) => {
  const { name, location, description, mainImageUrl } = activeCard;

  return (
    <div className={styles.singleCard}>
      <div className={styles.imageContainer}>
        <Image
          onClick={() => setActiveCard(null)}
          src="/assets/icons/sideCardBack.svg"
          width={28}
          height={28}
          alt="back"
          className={styles.backBtn}
        />
        <Image src={`${mainImageUrl || "/assets/images/sideCard.jpg"}`} fill alt="card" />
      </div>
      <div className={styles.textSection}>
        <div className={styles.addressCon}>
          <div>
            <h4>{name.slice(0, 20)}</h4>
          </div>
          <a
            href={`https://maps.google.com/?q=${location.coordinates[0]},${location.coordinates[1]}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/assets/icons/singleSideLocation.svg"
              width={104}
              height={30}
              alt="location"
              className={styles.ssLo}
            />
          </a>
        </div>

        <div className={styles.description}>
          <h4>Description</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
