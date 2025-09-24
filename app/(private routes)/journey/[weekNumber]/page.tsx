'use client';

import { useParams } from "next/navigation";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";
import styles from "./page.module.css";


export default function JourneyPage() {
  const params = useParams();
  const  weekNumber = parseInt(params.weekNumber as string) || 1;


  return (
    <div className={styles.journeyPage}>
    <div className={styles.journeyPage__content}> 
      <WeekSelector currentWeek={weekNumber} />
      <JourneyDetails weekNumber={weekNumber} />
    </div>
  </div>
  );

}