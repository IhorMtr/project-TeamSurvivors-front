import DiaryEntryClientPage from './DiaryEntryClientPage';

// This is now a Server Component
export default async function Page({
  params,
}: {
  params: { entryId: string };
}) {
  const { entryId } = await params;

  return <DiaryEntryClientPage entryId={entryId} />;
}
