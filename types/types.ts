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
