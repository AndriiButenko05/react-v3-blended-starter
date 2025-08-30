import { fetchPosts } from '@/lib/api';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsClient from './Posts.client';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostsPage({ params }: Props) {
  const { slug } = await params;
  const id = slug[0] === 'All' ? undefined : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', { searchQuery: '', currentPage: '', userId: id }],
    queryFn: () =>
      fetchPosts({
        searchText: '',
        page: 1,
        ...(id !== 'All' && { id }),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient userId={id}></PostsClient>;
    </HydrationBoundary>
  );
}
