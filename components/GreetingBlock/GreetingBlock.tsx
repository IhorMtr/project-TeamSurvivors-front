import { useAuthStore } from '@/lib/store/authStore';
import css from './GreetingBlock.module.css';

const GreetingBlock = () => {
  const user = useAuthStore(state => state.user);
  const title = user?.name || 'користувач';

  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
      return 'Доброго ранку';
    } else if (hours >= 12 && hours < 18) {
      return 'Доброго дня';
    } else if (hours >= 18 && hours < 23) {
      return 'Доброго вечора';
    } else {
      return 'Доброї ночі';
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.titleDashboard}>
        {getGreeting()}, {title}!
      </h1>
    </div>
  );
};

export default GreetingBlock;
