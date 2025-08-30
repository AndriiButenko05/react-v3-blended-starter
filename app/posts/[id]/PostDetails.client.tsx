'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById } from '@/lib/api';

import css from './PostDetails.module.css';
interface PostDetailsClientProps {
  id: string;
}

export default function PostDetailsClient({ id }: PostDetailsClientProps) {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  const { data } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchPostById(id),
    refetchOnMount: false,
  });

  return (
    <>
      <div className={css.container}>
        <div className={css.item}>
          <button className={css.backBtn} onClick={handleClickBack}>
            ← Back
          </button>

          <div className={css.post}>
            <div className={css.wrapper}>
              <div className={css.header}>
                <h2>{data?.title}</h2>
              </div>

              <p className={css.content}>{data?.body}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
