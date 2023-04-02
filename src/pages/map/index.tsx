import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
  getMarketplacePostsQuery,
  GetMarketplacePostsResponse,
  GeFilterMarketplacePostsVariables,
} from "@/apollo/posts.service";
import Header from "@/components/common/Header";
import Tags from "@/components/common/Tags";
import { useQuery } from "@apollo/client";
import { SideList } from "@/components/map/SideList";
import { IPost } from "@/types/IPost";
import { NextSeo, DefaultSeoProps } from "next-seo";
import config from "@/config/environments";
import { GetServerSideProps } from "next/types";


export default function MapPage() {
  const { data: posts, loading: postsLoading } = useQuery<
    GetMarketplacePostsResponse,
    GeFilterMarketplacePostsVariables
  >(getMarketplacePostsQuery, {
    variables: {
      filterPostsInput: { all: true },
    },
    fetchPolicy: "no-cache",
  });

  const [center, setCenter] = useState({ lat: 25.12457, lng: 20.12457 });
  const [activeCard, setActiveCard] = useState<IPost | null>(null);
  const containerStyle = {
    width: "100%",
    height: "85vh",
  };

  function handleOnClick(post: IPost) {
    setActiveCard(post);
    setCenter({
      lat: post.location?.coordinates[0] as number,
      lng: post.location?.coordinates[1] as number,
    });
  }

  const metaData: DefaultSeoProps =
    posts && posts?.filterMarketplacePosts?.data?.length
      ? {
          openGraph: {
            url: `${config.marketFrontendUrl}/map`,
            title: `Pura Vida | map`,
            description: posts?.filterMarketplacePosts?.data[0]?.description,
            images: posts?.filterMarketplacePosts?.data[0]?.imagesUrls?.map(
              (url) => ({
                url: url,
                width: 800,
                height: 600,
              })
            ),
          },
          canonical: `${config.marketFrontendUrl}/map`,
        }
      : {};

  return (
    <div className="h-screen overflow-clip">
      <NextSeo {...metaData} />
      <main className="flex flex-col">
        <Header postsLoading={postsLoading} />
        <section className="container flex flex-col gap-4 md:gap-6">
          <Tags />
        </section>
        <section className="container-fluid min-h-[85vh]">
          <SideList
            {...{
              activeCard,
              setActiveCard,
              cards: posts?.filterMarketplacePosts.data as IPost[],
            }}
            sideListTopMargin={140}
          />
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            options={{
              styles: [
                {
                  featureType: "all",
                  elementType: "labels.text",
                  stylers: [
                    {
                      visibility: "off",
                    },
                  ],
                },
                {
                  featureType: "poi",
                  elementType: "labels.icon",
                  stylers: [
                    {
                      visibility: "off",
                    },
                  ],
                },
              ],
            }}>
            {posts?.filterMarketplacePosts?.data.map((post) => (
              <Marker
                key={post._id}
                onClick={() => handleOnClick(post)}
                icon={"/assets/map-pin.png"}
                position={{
                  lat: post.location?.coordinates[0] as number,
                  lng: post.location?.coordinates[1] as number,
                }}
              />
            ))}
          </GoogleMap>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
