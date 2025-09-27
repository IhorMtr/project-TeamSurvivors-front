import { MyDay } from '@/types/types';
import css from './BabyTodayCard.module.css';
import Image from 'next/image';

interface BabyTodayCardProps {
  myDay: MyDay;
}

const BabyTodayCard = ({ myDay }: BabyTodayCardProps) => {
  return (
    <div className={css.babyTodayCard}>
      <h2>Малюк сьогодні</h2>
      <div className={css.babyTodayCardContent}>
        <div className={css.babyTodayCardBlockImg}>
          {myDay.image && (
            <Image
              width={500}
              height={300}
              className={css.babyTodayCardImg}
              src={myDay.image}
              alt="Малюк"
            />
          )}
        </div>
        <ul className={css.babyTodayCardBlockList}>
          <li>
            <span className={css.babyTodayCardBlockInfoBold}>Розмір: </span>
            Приблизно {myDay.babySize} см.
          </li>
          <li>
            <span className={css.babyTodayCardBlockInfoBold}>Вага: </span>
            Близько {myDay.babyWeight} грамів.
          </li>
          <li>
            <span className={css.babyTodayCardBlockInfoBold}>Активність: </span>
            {myDay.babyActivity}
          </li>
        </ul>
      </div>
      <p className={css.babyTodayCardDescription}>{myDay.babyDevelopment}</p>
    </div>
  );
};

export default BabyTodayCard;
