import css from './GreetingBlock.module.css';
interface GreetingBlockProps {
  title: string;
}
const GreetingBlock = ({ title }: GreetingBlockProps) => {
  return <h1 className={css.titleDashboard}>Доброго ранку, {title}!</h1>;
};

export default GreetingBlock;
