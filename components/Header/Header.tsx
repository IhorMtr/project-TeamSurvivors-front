import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import styles from './Header.module.css';

interface PageHeaderProps {
  breadcrumbs: { label: string; href: string }[];
  greeting: string;
}

export default function PageHeader({ breadcrumbs, greeting }: PageHeaderProps) {
  return (
    <header className={styles.pageHeader}>
      <div className={styles.pageHeaderContainer}>
        <div className={styles.breadcrumbsWrapper}>
          <Breadcrumbs items={breadcrumbs} />
        </div>
        
        <div className={styles.greetingWrapper}>
          <h1 className={styles.greeting}>{greeting}</h1>
        </div>
      </div>
    </header>
  );
}