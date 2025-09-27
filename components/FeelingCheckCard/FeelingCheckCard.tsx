import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import AddDiaryEntryModal from '../AddDiaryModal/AddDiaryEntryModal';
import { useState } from 'react';

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
      <div>
        <h2>Як ви себе почуваєте?</h2>
        <div>
          <span>Рекомендація на сьогодні:</span>
          <span>Занотуйте незвичні відчуття у тілі.</span>
        </div>
        <div>
          <button type="button" onClick={onCreateDiary}>
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
