import DiaryEntryCard from '@/components/DiaryEntryCard/DiaryEntryCard';
import DiaryList from '@/components/DiaryList/DiaryList';

export default function Page() {
  return (
    <DiaryList>
      <DiaryEntryCard />
      <DiaryEntryCard />
      <DiaryEntryCard />
      <DiaryEntryCard />
    </DiaryList>
  );
}
