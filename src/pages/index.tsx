import { useEffect, useState } from "react";
import Card from "@/components/Card";
import NavHeader from "@/components/Header";
import TagSlider from "@/components/TagSlider";
import { Grid, Pagination } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Map from "@/components/Map";
import useSWR from "swr";
import { getMarketplacePosts } from "@/services/posts.service";
import { CardType } from "@/types/Card";
import Header from "next/head";

enum Views {
  LIST_VIEW = "list-view",
  MAP_VIEW = "map-view",
}

export default function Home() {
  const [view, setIsViewList] = useState(Views.LIST_VIEW);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  const { data, mutate, isValidating } = useSWR(
    "posts",
    getMarketplacePosts({
      page: page,
      limit: 10,
      text: searchText,
      tagsSlugs: selectedTags,
    })
  );

  useEffect(() => {
    mutate();
  }, [page, searchText, selectedTags]);

  const toggleViewType = (view: Views) => {
    setIsViewList(view);
    router.push(`?view=${view}`, undefined, { shallow: true });
  };

  useEffect(() => {
    const { view, page, text } = router.query;
    if (view) {
      setIsViewList(view as Views);
    }
    if (text) {
      setSearchText(text as string);
    }
    if (router.query["tagsSlugs[]"]) {
      if (Array.isArray(router.query["tagsSlugs[]"])) {
        setSelectedTags(router.query["tagsSlugs[]"]);
      } else {
        setSelectedTags([router.query["tagsSlugs[]"]]);
      }
    }
    if (page) {
      setPage(Number(page));
    }
  }, [view, router]);

  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    router.query.page = `${value}`;
    router.push(router);
  };

  const ViewMap = {
    [Views.LIST_VIEW]: (
      <Grid container spacing={2} className={styles.cardsContainer}>
        <Grid item xs={12} className={styles.header}>
          <h3>Latest Posts</h3>
          {/* <div className={styles.location}>
            <Image
              src="/assets/icons/marker.svg"
              width={12}
              height={15}
              alt="marker"
            />
            <p>Cista Rica</p>
            <p>5 Km</p>
          </div> */}
        </Grid>
        {data?.data?.map((card: CardType) => (
          <Grid item key={card.address} xs={6} md={3} lg={3}>
            {" "}
            <Card mainImageUrl={""} {...{ ...card }} />{" "}
          </Grid>
        ))}
        {data && (
          <Grid item xs={12} className={styles.paginationContainer}>
            <Pagination
              onChange={handlePaginationChange}
              page={page}
              count={data?.pagination?.numberOfPages}
              size="small"
              color="primary"
            />
          </Grid>
        )}
      </Grid>
    ),
    [Views.MAP_VIEW]: (
      <div className="map-container">
        <Map cards={data?.data} />
      </div>
    ),
  };

  const ButtonViewMap = {
    [Views.LIST_VIEW]: (
      <button
        onClick={() => toggleViewType(Views.MAP_VIEW)}
        className={styles.toggleViewBtn}
      >
        <span>View Map</span>
        <Image src="/assets/icons/map.svg" width={14} height={14} alt="map" />
      </button>
    ),
    [Views.MAP_VIEW]: (
      <button
        onClick={() => toggleViewType(Views.LIST_VIEW)}
        className={`${styles.toggleViewBtn} ${styles.mapToggleViewBtn}`}
      >
        <span>View List</span>
        <Image src="/assets/icons/list.svg" width={14} height={8} alt="list" />
      </button>
    ),
  };

  return (
    <div className={styles.home}>
      <Header>
        <title>PuraVida</title>
      </Header>
      <NavHeader
        isValidating={isValidating}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <TagSlider {...{ selectedTags, setSelectedTags }} />
      <div className="container">
        {ViewMap[view]}
        {ButtonViewMap[view]}
      </div>
    </div>
  );
}
