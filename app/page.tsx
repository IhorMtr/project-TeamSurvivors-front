'use client';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import css from './dashboard.module.css';
import LayoutClient from '../components/LayoutClient/LayoutClient';
import { getMyDay, getMyDayProfile } from '@/lib/api/dasboard';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { MyDay } from '@/types/types';

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  const { data: resMyDayProfile } = useQuery({
    queryKey: ['myDayProfile', user.dueDate || '2026-01-15'],
    queryFn: ({ queryKey: [, dueDate] }) => getMyDayProfile(dueDate),
    enabled: !!isAuthenticated,
  });

  const { data: resMyDay } = useQuery({
    queryKey: ['myDay'],
    queryFn: getMyDay,
    enabled: !isAuthenticated,
  });

  const myDay = resMyDayProfile || resMyDay || ({} as MyDay);

  const randomDailyTip = Math.floor(
    Math.random() * myDay.momDailyTips?.length || 0
  );

  return (
    <LayoutClient>
      <GreetingBlock />
      {children}
      <div className={css.dashboardpage}>
        <div className={css.columnFirst}>
          <StatusBlock week={myDay.weekNumber} dayAll={myDay.daysLeftToBirth} />
          <BabyTodayCard myDay={myDay} />
          <MomTipCard dailyTip={myDay.momDailyTips?.at(randomDailyTip) || ''} />
        </div>
        <div className={css.columnSecond}>
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
    </LayoutClient>
  );
}

