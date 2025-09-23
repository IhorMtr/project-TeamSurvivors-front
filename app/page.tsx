import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import css from './dashboard.module.css';

import LayoutClient from '../components/LayoutClient/LayoutClient';
import { getMyDay } from '@/lib/api/dasboard';
export default async function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const resMyDay = await getMyDay();

  const randomDailyTip = Math.random() * resMyDay.momDailyTips.length - 1;

  return (
    <LayoutClient>
      {children}
      <div className={css.dashboardpage}>
        <GreetingBlock />
        <StatusBlock
          week={resMyDay.weekNumber}
          dayAll={resMyDay.daysLeftToBirth}
        />
        <BabyTodayCard myDay={resMyDay} />
        <MomTipCard dailyTip={resMyDay.momDailyTips.at(randomDailyTip) || ''} />
        <TasksReminderCard tasks={[]} />
        <FeelingCheckCard />
      </div>
    </LayoutClient>
  );
}
