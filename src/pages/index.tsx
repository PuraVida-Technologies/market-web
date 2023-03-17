import { getMarketplacePostsQuery } from '@/apollo/posts.service';
import { useQuery } from '@apollo/client';

export default function Home() {
  const { data, error } = useQuery(
    getMarketplacePostsQuery({ tagsSlugs: ['vehicles'] })
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
