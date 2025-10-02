import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import AddDiaryEntryModal from '../AddDiaryModal/AddDiaryEntryModal';
import { useState } from 'react';
import css from './FeelingCheckCard.module.css';

const FeelingCheckCard = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSuccess = () => {
    handleCloseModal();
  };

  return (
    <>
      <div className={css.feelingCheckCard}>
        <h2>Як ви себе почуваєте?</h2>
        <div className={css.feelingCheckCardText}>
          <p className={css.feelingCheckCardTextBold}>
            Рекомендація на сьогодні:
          </p>
          <p>Занотуйте незвичні відчуття у тілі.</p>
        </div>
        <div>
          <button
            className={css.feelingCheckCardButton}
            type="button"
            onClick={handleOpenModal}
          >
            Зробити запис у щоденник
          </button>
        </div>
      </div>

      <AddDiaryEntryModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        formProps={{
          onSuccess: handleSuccess,
        }}
      />
    </>
  );
};

export default FeelingCheckCard;
