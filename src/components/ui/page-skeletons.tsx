"use client"

import { Skeleton } from "@/components/ui/skeleton"

/**
 * Shared page skeleton components for instant loading states.
 * These display immediately during navigation for perceived performance.
 */

// Dashboard/Home page skeleton
export function HomeSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Status Block */}
      <Skeleton className="h-32 w-full rounded-xl" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// Library/Documents page skeleton
export function LibrarySkeleton() {
  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div className="hidden lg:flex lg:w-64 border-r bg-background flex-col shrink-0 p-4 space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="space-y-2 pt-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>

        {/* Folders Grid */}
        <div className="mb-10">
          <Skeleton className="h-6 w-24 mb-4 rounded" />
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div>
          <Skeleton className="h-6 w-36 mb-4 rounded" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden border">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Expenses page skeleton
export function ExpensesSkeleton() {
  return (
    <div className="flex h-full bg-gray-50 dark:bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-card border-r flex-shrink-0 flex-col p-6 space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-24 rounded" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="space-y-2 pt-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>

          {/* Expense List */}
          <div className="bg-white dark:bg-card rounded-xl border overflow-hidden">
            <div className="px-6 py-3 border-b">
              <Skeleton className="h-4 w-24 rounded" />
            </div>
            <div className="divide-y">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-3 w-24 rounded" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-5 w-20 rounded" />
                    <Skeleton className="h-3 w-16 rounded ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Settings page skeleton
export function SettingsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-9 w-32 rounded" />
        <Skeleton className="h-5 w-64 rounded" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24 rounded" />
                  <Skeleton className="h-4 w-48 rounded" />
                </div>
              </div>
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-36 rounded" />
            <Skeleton className="h-4 w-64 rounded" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}

// Calendar page skeleton
export function CalendarSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-xl overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="p-3 border-r last:border-r-0">
              <Skeleton className="h-4 w-8 mx-auto rounded" />
            </div>
          ))}
        </div>

        {/* Calendar Cells */}
        {[...Array(5)].map((_, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 border-b last:border-b-0">
            {[...Array(7)].map((_, dayIdx) => (
              <div key={dayIdx} className="h-24 p-2 border-r last:border-r-0 space-y-1">
                <Skeleton className="h-5 w-5 rounded" />
                {weekIdx % 2 === 0 && dayIdx % 3 === 0 && (
                  <Skeleton className="h-5 w-full rounded" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Deadlines page skeleton
export function DeadlinesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-48 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Integrations page skeleton
export function IntegrationsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-36 rounded" />
        <Skeleton className="h-5 w-96 rounded" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </div>
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Generic card list skeleton
export function CardListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="border rounded-xl p-4 flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      ))}
    </div>
  )
}

// Generic page header skeleton
export function PageHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-48 rounded" />
      <Skeleton className="h-5 w-96 rounded" />
    </div>
  )
}

// Generic page skeleton with header and content
export function GenericPageSkeleton({ children }: { children?: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      {children || <CardListSkeleton />}
    </div>
  )
}

