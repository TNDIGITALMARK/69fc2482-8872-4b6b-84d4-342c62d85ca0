'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold text-gradient font-space-grotesk mb-4">
          PredictStream
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}