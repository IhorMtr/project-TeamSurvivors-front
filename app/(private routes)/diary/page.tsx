import DiaryEntryCard from '@/components/DiaryEntryCard/DiaryEntryCard';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import DiaryList from '@/components/DiaryList/DiaryList';
import css from './page.module.css';

export default function DiaryPage() {
  return (
    <>
      <div className={css.mobileOnly}>
        <DiaryList>
          <DiaryEntryCard />
          <DiaryEntryCard />
          <DiaryEntryCard />
          <DiaryEntryCard />
        </DiaryList>
      </div>
      <div className={css.desktopOnly}>
        <DiaryList>
          <DiaryEntryCard />
          <DiaryEntryCard />
          <DiaryEntryCard />
        </DiaryList>
        <DiaryEntryDetails />
      </div>
    </>
  );
}
