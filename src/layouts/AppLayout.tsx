import client from '@/apollo/client';
import AntThemeProvider from '@/themes/AntThemeProvider';
import { ApolloProvider } from '@apollo/client';
import Header from "next/head";
import { NextAdapter } from 'next-query-params';
import { JSXElementConstructor, PropsWithChildren, ReactElement } from 'react';
import { QueryParamAdapter, QueryParamProvider } from 'use-query-params';

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

const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <QueryParamProvider adapter={Adapter}>
      <ApolloProvider client={client}>
        <main className={className}>
        <Header>
          <title>PuraVida</title>
          <meta name="description" content="PuraVida" />
          <link rel="icon" href="/assets/Logo.png" />
        </Header>
          <AntThemeProvider>{children}</AntThemeProvider>
        </main>
      </ApolloProvider>
    </QueryParamProvider>
  );
};

export default AppLayout;
