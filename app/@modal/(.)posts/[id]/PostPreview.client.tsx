'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById } from '@/lib/api';
import { useRouter } from 'next/navigation';

import css from './PostPreview.module.css';

interface PostPreviewClientProps {
  id: string;
}

export default function PostPreviewClient({ id }: PostPreviewClientProps) {
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
    <Modal onClose={handleClickBack}>
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
    </Modal>
  );
}
