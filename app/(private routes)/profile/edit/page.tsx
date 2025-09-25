'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileEditPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main profile page since edit functionality is integrated there
    router.replace('/profile');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '200px',
      color: 'var(--color-neutral)'
    }}>
      Redirecting to profile page...
    </div>
  );
}
