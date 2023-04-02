import client from '@/apollo/client';
import AntThemeProvider from '@/themes/AntThemeProvider';
import { ApolloProvider } from '@apollo/client';
import Header from "next/head";
import { NextAdapter } from 'next-query-params';
import { JSXElementConstructor, PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { QueryParamAdapter, QueryParamProvider } from 'use-query-params';
import { LoadScript } from '@react-google-maps/api';
import Image from "next/image";
import { useRouter } from 'next/router';
import styles from "./styles.module.scss";


interface AppLayoutProps extends PropsWithChildren {
  className?: string;
}

function Adapter(
  props: JSX.IntrinsicAttributes & {
    shallow?: boolean | undefined;
    children(
      adapter: QueryParamAdapter
    ): ReactElement<any, string | JSXElementConstructor<any>> | null;
  }
) {
  return <NextAdapter {...props} shallow={true} />;
}

enum Views {
  LIST_VIEW = "/",
  MAP_VIEW = "/map",
}





const AppLayout = ({ children, className }: AppLayoutProps) => {
  const router = useRouter();
  const [view, setView] = useState<string>(Views.LIST_VIEW)
  
  const toggleViewType = (view: string) => {
    router.push(`/${view}`, undefined, { shallow: true });
  };

  const ButtonViewMap: {[key: string]: any} = {
    [Views.LIST_VIEW]: (
      <button onClick={() => toggleViewType('/map')} className={styles.toggleViewBtn}>
        <span>View Map</span>
        <Image src="/assets/map.svg" width={14} height={14} alt="map" />
      </button>
    ),
    [Views.MAP_VIEW]: (
      <button
        onClick={() => toggleViewType('/')}
        className={`${styles.toggleViewBtn} ${styles.mapToggleViewBtn}`}
      >
        <span>View List</span>
        <Image src="/assets/list.svg" width={14} height={8} alt="list" />
      </button>
    ),
  };

  useEffect(()=>{
    if(router.pathname){
      setView(router.pathname as string)
    }
  }, [router.pathname])
  
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
      libraries={['places']}
    >
      <QueryParamProvider adapter={Adapter}>
        <ApolloProvider client={client}>
          <main className={className}>
            <Header>
              <title>PuraVida</title>
              <meta name="description" content="PuraVida" />
              <link rel="icon" href="/assets/Logo.png" />
            </Header>
            <AntThemeProvider>{children}</AntThemeProvider>
            {ButtonViewMap[view as string]}
          </main>
        </ApolloProvider>
      </QueryParamProvider>
    </LoadScript>
  );
};

export default AppLayout;
