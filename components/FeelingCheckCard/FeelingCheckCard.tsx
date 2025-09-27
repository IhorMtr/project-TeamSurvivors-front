import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import AddDiaryEntryModal from '../AddDiaryModal/AddDiaryEntryModal';
import { useState } from 'react';
import css from './FeelingCheckCard.module.css';

const FeelingCheckCard = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onCreateDiary = () => {
    if (!isAuthenticated) router.push('/auth/login');
    setIsOpen(true);
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
            onClick={onCreateDiary}
          >
            Зробити запис у щоденник
          </button>
        </div>
      </div>
      <AddDiaryEntryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => setIsOpen(false)}
      />
    </>
  );
};

export default FeelingCheckCard;
