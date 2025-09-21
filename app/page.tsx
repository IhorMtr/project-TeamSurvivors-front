import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';

export default function DashboardPage() {
  return (
    <>
      <GreetingBlock title="Ганна" />
      <StatusBlock week={1} dayAll={5} />
      <BabyTodayCard
        image="/path/to/image.jpg"
        babySize={50}
        babyWeight={3000}
        babyActivity="Активний"
        babyDevelopment="Розвивається відповідно до віку"
      />
      <MomTipCard dailyTip="Не забувайте пити достатньо води!" />
      <TasksReminderCard tasks={[]} />
      <FeelingCheckCard />
    </>
  );
}
