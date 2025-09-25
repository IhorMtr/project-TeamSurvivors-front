import axios from 'axios';
import { cookies } from 'next/headers';
import type { ApiResponse, RefreshResponse } from '@/lib/api/auth';

export async function nextServer() {
  const cookieStore = cookies();

  const { data } = await axios.post<ApiResponse<RefreshResponse>>(
    `${process.env.API_BASE}/api/auth/refresh`,
    {},
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  const accessToken = data.data.accessToken;

  return axios.create({
    baseURL: `${process.env.API_BASE}/api`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: cookieStore.toString(),
    },
  });
}
