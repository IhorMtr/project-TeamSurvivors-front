import css from './MomTipCard.module.css';

interface MomTipCardProps {
  dailyTip: string;
}

const MomTipCard = ({ dailyTip }: MomTipCardProps) => {
  return (
    <div className={css.momTipCardBlock}>
      <h2>Порада для мами</h2>
      <p>{dailyTip}</p>
    </div>
  );
};

export default MomTipCard;
