'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lightning } from 'lucide-react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/markets');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center">
            <Lightning className="w-10 h-10 text-white" fill="white" />
          </div>
        </div>
        <div className="text-4xl font-bold font-heading mb-4">
          ORACLE
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}