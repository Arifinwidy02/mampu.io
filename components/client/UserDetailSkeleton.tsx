'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function UserDetailSkeleton() {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/users">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to list
        </Link>
      </Button>

      <Card className="max-w-4xl mx-auto shadow-md">
        <CardHeader className="border-b bg-muted/30">
          <Skeleton className="h-7 w-64" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <section>
              <Skeleton className="h-3 w-24 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-40" />
              </div>
            </section>
            <section>
              <Skeleton className="h-3 w-32 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-3 w-64 mt-2" />
              </div>
            </section>
          </div>

          <div className="border-t pt-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-10 w-full max-w-[400px] rounded-lg mb-6" />
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl border space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
