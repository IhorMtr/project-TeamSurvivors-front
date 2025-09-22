import css from './DiaryPlaceholder.module.css';

export default function DiaryPlaceholder() {
  return (
    <div className={css.placeholder}>
      Наразі записи у щоденнику відсутні
    </div>
  );
}
