import css from './GreetingBlock.module.css';

const GreetingBlock = () => {
  const title = 'user';
  return <h1 className={css.titleDashboard}>Доброго ранку, {title}!</h1>;
};

export default GreetingBlock;
