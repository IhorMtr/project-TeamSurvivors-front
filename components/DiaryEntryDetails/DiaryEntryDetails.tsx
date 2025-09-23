'use client';
import { useState } from 'react';
import Image from 'next/image';
import css from './DiaryEntryDetails.module.css';
import Link from 'next/link';
import EmotionIconContainer from '../EmotionIconContainer/EmotionIconContainer';
import EmotionIcon from '../EmotionIcon/EmotionIcon';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import { DiaryData } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import ConfirmationModal from '../ui/Modal/ConfirmationModal';
import { deleteDiaryById } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function DiaryEntryDetails({ diary }: { diary?: DiaryData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteDiary } = useMutation({
    mutationFn: (id: string) => deleteDiaryById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
      router.push('/diary');
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (diary?._id) {
      deleteDiary(diary._id);
    } else {
      handleCloseModal();
    }
  };

  return (
    <>
      <section className={css.container}>
        <div className={css.detailHeader}>
          <div className={css.detailTitle}>
            <h3 className={css.title}>{diary?.title || ''}</h3>
            {diary && (
              <Link
                className={css.btn}
                href={'/diary'}
                onClick={() =>
                  alert(
                    'Клік по кнопці "Редагувати" відкриває сторінку редагування'
                  )
                }
              >
                <Image src={editIcon} alt="edit_btn" width={24} height={24} />
              </Link>
            )}
          </div>

          <div className={css.detailDate}>
            <div>{diary?.date ? formatDate(diary.date) : ''}</div>
            {diary && (
              <button className={css.btn} onClick={handleDelete}>
                <Image
                  src={deleteIcon}
                  alt="delete_btn"
                  width={24}
                  height={24}
                />
              </button>
              //TODO: додати функціонал відкриття модалки для редагування та видалення
            )}
          </div>
        </div>
        <p className={css.text}>{diary?.description}</p>
        <EmotionIconContainer>
          {diary?.emotions?.map(emotion => (
            <EmotionIcon key={emotion._id} emotion={emotion.title} />
          ))}
        </EmotionIconContainer>
      </section>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Видалити цей запис?"
        onCancel={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}