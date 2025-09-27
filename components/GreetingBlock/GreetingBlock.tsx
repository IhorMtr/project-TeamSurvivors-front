import { useAuthStore } from '@/lib/store/authStore';
import css from './GreetingBlock.module.css';

const GreetingBlock = () => {
  const user = useAuthStore(state => state.user);
  const title = user.name;
  return <h1 className={css.titleDashboard}>Доброго ранку, {title}!</h1>;
};

export default GreetingBlock;
