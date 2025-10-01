'use client';

import WeekButton from '../WeekButton/WeekButton';
import styles from './WeekSelector.module.css';
import { useRef, useEffect, useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import PuffLoader from 'react-spinners/PuffLoader';

interface WeekSelectorProps {
  selectedWeek: number;
  maxWeek: number;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  selectedWeek,
  maxWeek,
}) => {
  const router = useRouter();
  const allWeeks = Array.from({ length: 42 }, (_, i) => i + 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  const [thumbWidth, setThumbWidth] = useState(40);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; left: number }>({ x: 0, left: 0 });

  const handleWeekClick = (weekNumber: number) => {
    if (weekNumber <= maxWeek && weekNumber !== selectedWeek) {
      startTransition(() => {
        router.push(`/journey/${weekNumber}`);
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const weekElement = container.children[selectedWeek - 1] as
      | HTMLElement
      | undefined;
    if (!weekElement) return;

    const weekLeft = weekElement.offsetLeft;
    const weekWidth = weekElement.offsetWidth;
    const containerWidth = container.offsetWidth;

    container.scrollTo({
      left: Math.max(0, weekLeft - containerWidth / 2 + weekWidth / 2),
      behavior: 'smooth',
    });
  }, [selectedWeek]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollTo({
        left: container.scrollLeft + e.deltaY,
        behavior: 'auto',
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const updateThumb = () => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const trackW = track.clientWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = el.clientWidth / Math.max(el.scrollWidth, 1);
    const tWidth = Math.max(24, Math.floor(trackW * ratio));
    const maxLeft = Math.max(trackW - tWidth, 0);
    const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    setThumbWidth(tWidth);
    setThumbLeft(Math.round(maxLeft * progress));
  };

  useEffect(() => {
    updateThumb();
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => updateThumb();
    el.addEventListener('scroll', onScroll);

    const ro = new ResizeObserver(() => updateThumb());
    ro.observe(el);
    if (trackRef.current) ro.observe(trackRef.current);

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMove = (clientX: number) => {
      const el = containerRef.current;
      const track = trackRef.current;
      if (!isDragging || !el || !track) return;

      const trackW = track.clientWidth;
      const maxLeft = Math.max(trackW - thumbWidth, 0);
      const delta = clientX - dragStart.current.x;
      const newLeft = Math.min(
        Math.max(dragStart.current.left + delta, 0),
        maxLeft
      );

      setThumbLeft(newLeft);

      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxLeft > 0 ? newLeft / maxLeft : 0;
      el.scrollLeft = Math.round(maxScroll * progress);
    };

    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) onMove(e.touches[0].clientX);
    };

    const handleUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, thumbWidth]);

  const startDrag = (clientX: number) => {
    dragStart.current = { x: clientX, left: thumbLeft };
    setIsDragging(true);
  };

  return (
    <div className={styles.weekSelectorContainer}>
      <div ref={containerRef} className={styles.weekSelector}>
        {allWeeks.map(week => (
          <WeekButton
            key={week}
            weekNumber={week}
            isCurrent={week === selectedWeek}
            isDisabled={week > maxWeek || isPending}
            onClick={() => handleWeekClick(week)}
          />
        ))}
      </div>

      <div
        className={styles.scrollbarTrack}
        ref={trackRef}
        onMouseDown={e => {
          const track = trackRef.current;
          const el = containerRef.current;
          if (!track || !el) return;
          const rect = track.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const trackW = track.clientWidth;
          const maxScroll = el.scrollWidth - el.clientWidth;
          const ratio = Math.min(Math.max(x / Math.max(trackW, 1), 0), 1);
          el.scrollLeft = Math.round(maxScroll * ratio);
        }}
      >
        <div
          className={styles.scrollbarThumb}
          style={{
            width: `${thumbWidth}px`,
            transform: `translateX(${thumbLeft}px)`,
          }}
          onMouseDown={e => {
            e.stopPropagation();
            startDrag(e.clientX);
          }}
          onTouchStart={e => {
            e.stopPropagation();
            if (e.touches[0]) startDrag(e.touches[0].clientX);
          }}
        />
      </div>

      {isPending && (
        <div className={styles.loaderContainer}>
          <PuffLoader />
        </div>
      )}
    </div>
  );
};

export default WeekSelector;
