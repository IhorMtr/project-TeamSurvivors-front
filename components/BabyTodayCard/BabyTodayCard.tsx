import css from './BabyTodayCard.module.css';

interface BabyTodayCardProps {
  image: string;
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
}

const BabyTodayCard = ({
  image,
  babySize,
  babyWeight,
  babyActivity,
  babyDevelopment,
}: BabyTodayCardProps) => {
  return (
    <div className={css.babyTodayCard}>
      <h2>Малюк сьогодні</h2>
      <div className={css.babyTodayCardContent}>
        <div className={css.babyTodayCardBlockImg}>
          <img className={css.babyTodayCardImg} src={image} alt="Малюк" />
        </div>
        <ul className={css.babyTodayCardBlockList}>
          <li>
            <span className={css.babyTodayCardBlockInfoBold}>Розмір: </span>
            Приблизно {babySize} см.
          </li>
          <li>
            <span className={css.babyTodayCardBlockInfoBold}>Вага: </span>
            Близько {babyWeight} грамів.
          </li>
          <li>
            <span className={css.babyTodayCardBlockInfoBold}>Активність: </span>
            {babyActivity}
          </li>
        </ul>
      </div>
      <p className={css.babyTodayCardDescription}>{babyDevelopment}</p>
    </div>
  );
};

export default BabyTodayCard;
