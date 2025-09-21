import Link from 'next/link';
import styles from './Breadcrumps.module.css';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={index} className={styles.breadcrumbItem}>
          {index > 0 && (
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={styles.separator}
            >
              <path 
                d="M9.38672 6.67188C9.48754 6.67188 9.56452 6.70229 9.64258 6.78027L14.5869 11.7246C14.6408 11.7785 14.666 11.8205 14.6777 11.8486V11.8496C14.6925 11.8852 14.7012 11.9249 14.7012 11.9736C14.7012 12.0223 14.6925 12.0621 14.6777 12.0977V12.0986C14.666 12.1268 14.6408 12.1687 14.5869 12.2227L9.61816 17.1914C9.54039 17.2692 9.47325 17.291 9.39258 17.2881C9.29855 17.2846 9.21769 17.2527 9.13184 17.167C9.05371 17.0889 9.02246 17.012 9.02246 16.9111C9.02246 16.8102 9.05371 16.7334 9.13184 16.6553L13.8135 11.9736L9.10645 7.2666C9.02878 7.1889 9.00684 7.12259 9.00977 7.04199C9.01321 6.94773 9.04578 6.86633 9.13184 6.78027C9.20976 6.70246 9.28613 6.67195 9.38672 6.67188Z" 
                fill="black" 
                stroke="black" 
              />
            </svg>
          )}
          <Link 
            href={item.href} 
            className={`${styles.breadcrumbLink} ${index === items.length - 1 ? styles.breadcrumbLinkCurrent : ''}`}
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}