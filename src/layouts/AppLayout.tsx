import client from '@/apollo/client';
import AntThemeProvider from '@/themes/AntThemeProvider';
import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

interface AppLayoutProps extends PropsWithChildren {
  className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <ApolloProvider client={client}>
      <main className={className}>
        <AntThemeProvider>{children}</AntThemeProvider>
      </main>
    </ApolloProvider>
  );
};

export default AppLayout;
