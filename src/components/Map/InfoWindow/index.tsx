/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Image from "next/image";
import { CardType } from "@/types/Card";
import styles from "./styles.module.scss";

const InfoWindow = ({
  card,
  handleActiveMarker,
}: {
  card: CardType;
  handleActiveMarker: (markerId: string) => void;
}) => {
  const { name, location, address } = card;

  return (
    <div className={styles.infoWindow} onClick={(e) => e.stopPropagation()}>
      <Image
        src="/assets/icons/close.svg"
        width={16}
        height={16}
        alt="close"
        className={styles.closeIcon}
        onClick={() => handleActiveMarker("")}
      />
      <div className={styles.imageContainer}>
        <Image src={"/assets/icons/infoWindowImg.svg"} fill alt="card" />
      </div>
      <div className={styles.infoContainer}>
        <h4>{name.slice(0, 20)}</h4>
        <div className={styles.content}>
          <p>{address}</p>
        </div>
        <div className={styles.cta}>
          <button>
            <a
              href={`https://maps.google.com/?q=${location.coordinates[0]},${location.coordinates[1]}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/assets/icons/send.svg" width={11} height={14} alt="direction" />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};
export default InfoWindow;
