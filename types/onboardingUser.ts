export interface onboardingUser {
  photo?: string | File | null;
  gender: 'boy' | 'girl' | 'unknown' | null;
  dueDate: string | null;
}
