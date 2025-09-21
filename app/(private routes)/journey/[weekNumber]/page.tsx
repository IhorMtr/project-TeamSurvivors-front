import WeekSelector from "@/components/WeekSelector/WeekSelector";
import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";
import styles from "./page.module.css";
import PageHeader from "@/components/Header/Header";

interface PageProps {
  params: Promise<{ weekNumber: string }>;
}

export default async function JourneyPage({ params }: PageProps) {
  const { weekNumber } = await params;

  const breadcrumbs = [
    { label: "Лелека", href: "/" },
    { label: "Подорож", href: `/journey/${weekNumber}` }
  ];


  return (
    <div className={styles.journeyPage}>
      {/* Page Header */}
      <PageHeader 
        breadcrumbs={breadcrumbs}
        greeting="Доброго ранку, Ганна!"
      />
      
      <div className={styles.journeyPage__content}>
        <WeekSelector />
        <JourneyDetails />
      </div>
    </div>
  );

}