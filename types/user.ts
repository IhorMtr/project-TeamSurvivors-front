export interface User {
  id: string;
  email: string;
  name: string;
  photo: string | null;
  gender: 'male' | 'female' | 'other' | null;
  dueDate: string | null;
}
