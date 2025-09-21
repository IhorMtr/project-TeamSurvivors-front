'use client';

import { useState } from "react";
import styles from "./JourneyDetails.module.css";
import BabyDevelopment from "../BabyDevelopment/BabyDevelopment";
import MomDevelopment from "../MomDevelopment/MomDevelopment";

export default function JourneyDetails() {
  const [activeTab, setActiveTab] = useState<'baby' | 'mom'>('baby');

  return (
    <div className={styles.journeyDetailsContainer}>
      <div className={`${styles.tabs} ${activeTab === 'mom' ? styles.tabsMomActive : ''}`}>
        <button
          className={`${styles.tab} ${activeTab === 'baby' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('baby')}
        >
          <span className={styles.tabText}>Розвиток малюка</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'mom' ? styles.tabActiveMom : ''}`}
          onClick={() => setActiveTab('mom')}
        >
          <span className={styles.tabText}>Тіло мами</span>
        </button>
      </div>

      
      <div className={styles.content}>
        {activeTab === 'baby' ? (
          <BabyDevelopment />
        ) : (
          <MomDevelopment />
        )}
      </div>
    </div>
  );
}