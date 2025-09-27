import { DiaryData } from '@/types/types';
import { api, ApiResponse } from './auth';

export type DiaryEntryRequestPayload = {
  title: string;
  emotions: string[];
  description: string;
  date: string;
};

export async function createDiaryEntry(
  payload: DiaryEntryRequestPayload
): Promise<DiaryData> {
  const response = await api.post<ApiResponse<DiaryData>>('/diaries', payload);

  return response.data.data;
}

export async function updateDiaryEntry(
  entryId: string | number,
  payload: Partial<DiaryEntryRequestPayload>
): Promise<DiaryData> {
  const response = await api.patch<ApiResponse<DiaryData>>(
    `/diaries/${entryId}`,
    payload
  );

  return response.data.data;
}
