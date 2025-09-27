'use client';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import LayoutClient from '../components/LayoutClient/LayoutClient';
import { useState } from 'react';

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(true);
  function handleClose() {
    setIsOpen(false);
  }
  return (
    <LayoutClient>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard</p>
      </div>
      <AddTaskModal isOpen={isOpen} onClose={handleClose} />
    </LayoutClient>
  );
}
