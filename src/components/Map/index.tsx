/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { CardType } from "@/types/Card";
import Marker from "./Marker";
import { SideList } from "./SideList";
import environments from "@/config/environments";

const Map = ({ cards, sideListTopMargin }: { cards: CardType[]; sideListTopMargin: number }) => {
  const [activeMarker, setActiveMarker] = useState<string>("");
  const [center, setCenter] = useState({ lat: 25.12457, lng: 20.12457 });
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const handleActiveMarker = (markerID: string) => {
    const newCenter = markerID.split("-");
    if (window.innerWidth >= 1250) {
      setCenter({
        lat: Number(newCenter[0]) + 1,
        lng: Number(newCenter[1]) + 1,
      });
    } else if (window.innerWidth > 1024) {
      setCenter({
        lat: Number(newCenter[0]) + 1,
        lng: Number(newCenter[1]) + 2,
      });
    } else if (window.innerWidth > 576) {
      setCenter({
        lat: Number(newCenter[0]) + 0.5,
        lng: Number(newCenter[1]) + 0,
      });
    } else if (window.innerWidth <= 576) {
      setCenter({
        lat: Number(newCenter[0]),
        lng: Number(newCenter[1]) + 0.5,
      });
    }
    if (markerID === activeMarker) {
      return;
    }
    setActiveMarker(markerID);
  };

  return (
    <>
      <SideList {...{ activeCard, setActiveCard, cards, sideListTopMargin }} />
      <GoogleMapReact
        bootstrapURLKeys={{
          key: environments.mapApiKey,
        }}
        center={center}
        defaultZoom={5}
        onClick={() => setActiveMarker("")}
      >
        {cards?.map((card, i) => (
          <Marker
            key={`${card.address}-${i}`}
            card={card}
            lat={card.location.coordinates[0]}
            lng={card.location.coordinates[1]}
            activeMarker={activeMarker}
            handleActiveMarker={handleActiveMarker}
          />
        ))}
      </GoogleMapReact>
    </>
  );
};

export default Map;
