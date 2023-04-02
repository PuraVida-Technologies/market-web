import Image from "next/image";
import { Carousel, Rate } from "antd";
import styles from "./styles.module.scss";
import { IPost } from "@/types/IPost";

const SingleCard = ({
  activeCard,
  setActiveCard,
}: {
  activeCard: IPost;
  setActiveCard: (card: null) => void;
}) => {
  const { name, description, rating, location, mainImageUrl, imagesUrls } =
    activeCard;

  return (
    <div className={styles.singleCard}>
      <div className={styles.imageContainer}>
      <Image
          onClick={() => setActiveCard(null)}
          src="/assets/icons/sideCardBack.svg"
          width={28}
          height={28}
          alt="back"
          className={`${styles.backBtn} object-cover origin-center rounded-t-lg`}
        />

      <Carousel
            className="border-b border-gray-light"
            dots={{
              className:
                'bg-white align-middle w-min mx-auto rounded-lg [&>[class="slick-active"]_button]:bg-primary [&>:not([class="slick-active"])_button]:bg-primary [class="slick-active"]_button]:rounded [&>:not([class="slick-active"])_button]:rounded',
            }}
          >
            {imagesUrls?.length? (
              imagesUrls?.map((image) => (
                <div
                  key={image}
                  className="relative w-full sm:w-[400px] h-[250px] sm:rounded-lg"
                >
                  <Image
                    alt=""
                    src={image}
                    fill
                    className="object-cover object-center w-full h-full align-middle sm:rounded-t-lg"
                  />
                </div>
              ))
            ) : (
              <div className="relative w-full sm:w-[400px] h-[250px] sm:rounded-lg">
                <Image
                  alt=""
                  src={mainImageUrl}
                  fill
                  className="object-cover object-center w-full h-full align-middle sm:rounded-t-lg"
                />
              </div>
            )}
          </Carousel>
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
        <div className={styles.stars}>
          {rating && (
            <div className={styles.rating}>
              <Rate allowHalf value={rating} disabled />
            </div>
          )}
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
