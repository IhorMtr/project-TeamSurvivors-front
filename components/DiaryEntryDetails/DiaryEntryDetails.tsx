'use client';
import { useState } from 'react';
import Image from 'next/image';
import css from './DiaryEntryDetails.module.css';
import EmotionIconContainer from '../EmotionIconContainer/EmotionIconContainer';
import EmotionIcon from '../EmotionIcon/EmotionIcon';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import { DiaryData } from '@/types/types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteDiaryById } from '@/lib/api/clientApi';
import { formatDate } from '@/lib/utils';
import ConfirmationModal from '../ui/Modal/ConfirmationModal';
import AddDiaryEntryModal from '../AddDiaryModal/AddDiaryEntryModal';
import { useMemo } from 'react';

import { useDiaryStore } from '@/lib/store/diaryStore';

export default function DiaryEntryDetails({ diary }: { diary?: DiaryData }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAddDiaryModalOpen, setIsAddDiaryModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setSelectedDiary } = useDiaryStore();

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
    setIsConfirmModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsConfirmModalOpen(false);
    setIsAddDiaryModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (diary?._id) {
      deleteDiary(diary._id);
    } else {
      handleCloseModal();
    }
  };
  const handleEdit = () => {
    setIsAddDiaryModalOpen(true);
  };

  const formInitialValues = useMemo(() => {
    if (!diary) return {};
    return {
      id: diary._id,
      title: diary.title,
      description: diary.description,
      categories: diary.emotions.map(emotion => ({
        id: emotion._id,
        title: emotion.title,
      })),
    };
  }, [diary]);

  const handleSuccess = (updatedDiary: DiaryData) => {
    queryClient.invalidateQueries({ queryKey: ['diaries'] });
    if (diary?._id) {
      queryClient.invalidateQueries({ queryKey: ['diaries', diary._id] });
    }
    setSelectedDiary(updatedDiary);
    handleCloseModal();
  };

  return (
    <>
      <section className={css.container}>
        <div className={css.detailHeader}>
          <div className={css.detailTitle}>
            <h3 className={css.title}>{diary?.title || ''}</h3>
            {diary && (
              <button className={css.btn} onClick={handleEdit}>
                <Image src={editIcon} alt="edit_btn" width={24} height={24} />
              </button>
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
        isOpen={isConfirmModalOpen}
        title="Видалити цей запис?"
        onCancel={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <AddDiaryEntryModal
        isOpen={isAddDiaryModalOpen}
        onClose={handleCloseModal}
        mode="edit"
        formProps={{
          initialValues: formInitialValues,
          onSuccess: handleSuccess,
        }}
      />
    </>
  );
}
