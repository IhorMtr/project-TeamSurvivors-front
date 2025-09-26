'use client';

import { Toaster } from 'react-hot-toast';

export default function ReactToaster() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}
