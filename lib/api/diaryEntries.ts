export type DiaryEntryRequestPayload = {
  title: string;
  emotions: string[];
  description: string;
};

export type SaveDiaryEntryOptions = {
  entryId?: string | number;
  apiBase?: string;
  apiPath?: string;
  headers?: Record<string, string>;
  method?: 'POST' | 'PUT';
  errorMessage?: string;
};

const DEFAULT_PATH = '/api/diaries';

export async function saveDiaryEntry(
  payload: DiaryEntryRequestPayload,
  options: SaveDiaryEntryOptions = {}
) {
  const {
    entryId,
    apiBase,
    apiPath = DEFAULT_PATH,
    headers,
    method = entryId ? 'PUT' : 'POST',
    errorMessage,
  } = options;

  const normalizedPath = `/${apiPath.replace(/^\/+/, '')}`;
  const resourcePath = entryId != null ? `${normalizedPath}/${entryId}` : normalizedPath;
  const endpoint = apiBase ? `${apiBase.replace(/\/$/, '')}${resourcePath}` : resourcePath;

  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const fallback =
      errorMessage ?? (method === 'PUT' ? 'Не вдалося оновити запис' : 'Не вдалося створити запис');
    const errorText = (await response.text().catch(() => '')).trim();
    const message = errorText ? `${fallback}: ${errorText}` : fallback;
    throw new Error(message);
  }

  return response
    .json()
    .catch(() => ({}));
}

export async function createDiaryEntry(
  payload: DiaryEntryRequestPayload,
  options: Omit<SaveDiaryEntryOptions, 'entryId' | 'method'> = {}
) {
  return saveDiaryEntry(payload, { ...options, method: 'POST', entryId: undefined });
}

export async function updateDiaryEntry(
  entryId: string | number,
  payload: DiaryEntryRequestPayload,
  options: Omit<SaveDiaryEntryOptions, 'entryId'> = {}
) {
  return saveDiaryEntry(payload, { ...options, entryId, method: 'PUT' });
}
