import Image from 'next/image';
import css from './DiaryList.module.css';
import addIcon from '../../assets/add_circle.svg';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { DiaryData } from '@/types/types';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import DiaryPlaceholder from '../DiaryPlaceholder/DiaryPlaceholder';
import AddDiaryEntryModal from '../AddDiaryModal/AddDiaryEntryModal';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function DiaryList({ diaries }: { diaries: DiaryData[] }) {
  const [isAddDiaryModalOpen, setIsAddDiaryModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { setSelectedDiary } = useDiaryStore();

  const handleCloseModal = () => {
    setIsAddDiaryModalOpen(false);
  };
  const handleAddDiaryEntry = () => {
    setIsAddDiaryModalOpen(true);
  };

  const handleSuccess = (newDiary: DiaryData) => {
    queryClient.setQueryData<DiaryData[]>(['diaries'], old =>
      old ? [newDiary, ...old] : [newDiary]
    );

    setSelectedDiary(newDiary);
    handleCloseModal();
  };

  return (
    <section className={css.diarySection}>
      <div className={css.container}>
        <div className={css.listHeader}>
          <h3 className={css.title}>Ваші записи</h3>
          <div className={css.btnSection}>
            <p className={css.btn_name}>Новий запис</p>
            <button className={css.btn} onClick={handleAddDiaryEntry}>
              <Image src={addIcon} alt="add_btn" width={24} height={24} />
            </button>
          </div>
        </div>
        {diaries.length > 0 ? (
          diaries.map(diary => (
            <DiaryEntryCard key={diary._id} diaryData={diary} />
          ))
        ) : (
          <DiaryPlaceholder />
        )}
      </div>
      <AddDiaryEntryModal
        isOpen={isAddDiaryModalOpen}
        onClose={handleCloseModal}
        mode="create"
        formProps={{
          onSuccess: handleSuccess,
        }}
      />
    </section>
  );
}
