import { IPost } from "@/types/IPost";
import Image from "next/image";
import styles from "./styles.module.scss";

type ListCardProps = {
  card: IPost;
  setActiveCard: (card: IPost) => void;
}
const ListCard = (listCardProps: ListCardProps) => {
  const { card, setActiveCard } = listCardProps;
  
  const { name, location, mainImageUrl, description } = card;

  return (
    <div
      className={`${styles.listCard} h-[120px] min-w-[300px] sm:min-w-[368px] sm:h-[150px]`}
      onClick={() => setActiveCard(card)}>
      <div className={styles.imageContainer}>
        <Image
          src={mainImageUrl}
          fill
          alt="card"
          className="object-cover origin-center rounded-t-lg"
        />
      </div>
      <div className={`${styles.infoContainer} overflow-clip`}>
        <h4>{name.slice(0, 20)}</h4>
        <div className={styles.content}>
          <p>{description.slice(0, 100)}</p>
        </div>
        <div className={styles.cta}>
          <button onClick={(e) => e.stopPropagation()}>
            <a
              href={`https://maps.google.com/?q=${location.coordinates[0]},${location.coordinates[1]}`}
              target="_blank"
              rel="noreferrer">
              <Image
                src="/assets/icons/send.svg"
                width={11}
                height={14}
                alt="direction"
                className="object-cover origin-center rounded-t-lg"
              />
              <span>Direction</span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
