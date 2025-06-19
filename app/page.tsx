import { Suspense } from "react"
import WallpaperGrid from "@/components/wallpaper-grid"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Labubu Wallpapers
            </h1>
            <p className="text-sm text-muted-foreground mt-1">高清动态壁纸，免费下载</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/login">管理员登录</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<GridSkeleton />}>
          <WallpaperGrid />
        </Suspense>
      </main>
    </div>
  )
}

// 更新首页骨架屏，适配新的瀑布流布局
function GridSkeleton() {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="break-inside-avoid mb-3 bg-white rounded-2xl overflow-hidden">
          <Skeleton
            className={`w-full rounded-t-2xl ${
              i % 6 === 0
                ? "h-64"
                : i % 6 === 1
                  ? "h-80"
                  : i % 6 === 2
                    ? "h-56"
                    : i % 6 === 3
                      ? "h-72"
                      : i % 6 === 4
                        ? "h-96"
                        : "h-60"
            }`}
          />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <div className="flex justify-between pt-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
