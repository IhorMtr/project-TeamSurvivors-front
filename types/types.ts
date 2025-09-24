export type Emotion = {
  _id: string;
  title: string;
};

export type DiaryData = {
  _id: string;
  title: string;
  description: string;
  date: string;
  emotions: Emotion[];
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type MyDay = {
  _id: string;
  daysLeftToBirth: number;
  weekNumber: number;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  momDailyTips: string[];
};

export type Task = {
  _id: string;
  isDone: boolean;
  name: string;
  date: string;
};
