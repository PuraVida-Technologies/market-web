import Image from "next/image";
import { CardType } from "@/types/Card";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss";

type ModalCardPropsType = { activeCard: CardType; setActiveCard: (card: null) => void };

const ModalCard = ({ activeCard, setActiveCard }: ModalCardPropsType): JSX.Element => {
  const { name, address, description, location, mainImageUrl } = activeCard;
  console.log(mainImageUrl);

  return (
    <div className={styles.singleCard}>
      <div className={styles.imageContainer}>
        <CloseIcon onClick={() => setActiveCard(null)} className={styles.closeBtn} fontSize="small" />
        <Image src={`${mainImageUrl}`} fill alt="card" />
      </div>
      <div className={styles.textSection}>
        <div className={styles.addressCon}>
          <div>
            <h4>{name?.slice(0, 20)}</h4>
            <div>
              <Image
                src="/assets/icons/ssMapIcon.svg"
                width={12}
                height={14}
                alt="location"
                className={styles.ssMapIcon}
              />
              <p>{address}</p>
            </div>
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

export default ModalCard;
