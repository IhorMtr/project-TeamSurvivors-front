import { DiaryData } from '@/types/types';
import { api, ApiResponse } from './auth';

export type DiaryEntryRequestPayload = {
  title: string;
  emotions: string[];
  description: string;
};

export async function createDiaryEntry(
  payload: DiaryEntryRequestPayload
): Promise<DiaryData> {
  const response = await api.post<ApiResponse<DiaryData>>(
    '/diary-entries',
    payload
  );

  return response.data.data;
}

export async function updateDiaryEntry(
  entryId: string | number,
  payload: Partial<DiaryEntryRequestPayload>
): Promise<DiaryData> {
  const response = await api.patch<ApiResponse<DiaryData>>(
    `/diary-entries/${entryId}`,
    payload
  );

  return response.data.data;
}
