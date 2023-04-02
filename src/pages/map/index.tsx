import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
  POSTS_LIMIT,
  getMarketplacePostsQuery,
  GetMarketplacePostsResponse,
  GeFilterMarketplacePostsVariables,
} from "@/apollo/posts.service";
import Header from "@/components/common/Header";
import Tags from "@/components/common/Tags";
import { useQuery } from "@apollo/client";
import { SideList } from "@/components/map/SideList";
import { IPost } from "@/types/IPost";

export default function MapPage() {

  const { data: posts, loading: postsLoading } = useQuery<
    GetMarketplacePostsResponse,
    GeFilterMarketplacePostsVariables
  >(getMarketplacePostsQuery, {
    variables: {
      filterPostsInput: { limit: POSTS_LIMIT },
    },
    fetchPolicy: 'no-cache',
  });

  const [center, setCenter] = useState({ lat: 25.12457, lng: 20.12457 });
  const [activeCard, setActiveCard] = useState<IPost | null>(null);
  const containerStyle = {
    width: "100%",
    height: "85vh",
  };

  function handleOnClick(post: IPost) {    
    setActiveCard(post);
    setCenter({lat: post.location?.coordinates[0] as number,
      lng: post.location?.coordinates[1] as number,})
  }

  return (
    <>
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
            sideListTopMargin={163}
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
            }}
          >
            {posts?.filterMarketplacePosts?.data.map((post) => (
              <Marker
                key={post._id}
                onClick={() => handleOnClick(post)}
                icon={"/assets/marker.svg"}
                position={{
                  lat: post.location?.coordinates[0] as number,
                  lng: post.location?.coordinates[1] as number,
                }}
              />
            ))}
          </GoogleMap>
        </section>
      </main>
    </>
  );
}
