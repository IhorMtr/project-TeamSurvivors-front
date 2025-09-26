export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  gender: 'male' | 'female' | 'other' | null;
  dueDate: string | null;
}
