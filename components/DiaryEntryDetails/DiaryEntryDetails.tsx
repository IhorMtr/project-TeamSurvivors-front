import Image from 'next/image';
import css from './DiaryEntryDetails.module.css';
import Link from 'next/link';
import EmotionIconContainer from '../EmotionIconContainer/EmotionIconContainer';
import EmotionIcon from '../EmotionIcon/EmotionIcon';
export default function DiaryEntryDetails() {
  return (
    // TODO: add path
    <section className={css.container}>
      <div className={css.detailTitle}>
        <h3>Перший привіт</h3>
        <Link className={css.btn} href="/diary/edit">
          <Image src="/edit_square.svg" alt="edit_btn" width={24} height={24} />
        </Link>
      </div>
      <div className={css.detailDate}>
        <div>15 липня 2025</div>
        <Link className={css.btn} href="/diary/edit">
          <Image
            src="/delete_forever.svg"
            alt="delete_btn"
            width={24}
            height={24}
          />
        </Link>
      </div>
      <p className={css.text}>
        Це сталося! Сьогодні ввечері, коли я спокійно дивилася фільм, я це
        відчула. Спочатку подумала, що здалося. Такий ледь вловимий поштовх
        зсередини, ніби хтось легенько постукав. Я завмерла, поклала руку на
        живіт і стала чекати. І за хвилину — знову! Я розплакалась від щастя. Це
        перше справжнє «привіт» від мого малюка. Покликала чоловіка, він довго
        тримав руку на животі, і йому теж пощастило відчути один поштовх. Його
        очі в цей момент — я ніколи не забуду. Тепер я точно знаю, що я не сама.
        Там справді хтось є, росте і спілкується зі мною. Неймовірне відчуття.
      </p>
      <EmotionIconContainer>
        <EmotionIcon />
        <EmotionIcon />
      </EmotionIconContainer>
    </section>
  );
}
