import css from './StatusBlock.module.css';

interface StatusBlockProps {
  week: number;
  dayAll: number;
}

const StatusBlock = ({ week, dayAll }: StatusBlockProps) => {
  return (
    <div className={css.statusBlock}>
      <div className={css.statusBlockInfo}>
        <span className={css.statusBlockInfoWeekDay}>Тиждень</span>
        <span className={css.statusBlockInfoNumber}>{week}</span>
      </div>
      <div className={css.statusBlockInfo}>
        <span className={css.statusBlockInfoWeekDay}>Днів до зустрічі</span>
        <span className={css.statusBlockInfoNumber}>~{dayAll}</span>
      </div>
    </div>
  );
};

export default StatusBlock;
