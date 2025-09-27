import DiaryEntryClientPage from './DiaryEntryClientPage';

export default async function Page({
  params,
}: {
  params: { entryId: string };
}) {
  const { entryId } = await params;

  return <DiaryEntryClientPage entryId={entryId} />;
}
