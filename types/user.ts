export interface User {
  id: string;
  email: string;
  name: string;
  photo: string | null;
  gender: 'boy' | 'girl' | 'unknown' | null;
  dueDate: string | null;
}
