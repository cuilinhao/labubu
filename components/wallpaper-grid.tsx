"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Download, Heart } from "lucide-react"
import type { WallpaperItem } from "@/lib/types"

export default function WallpaperGrid() {
  // 核心状态：数据、加载状态、错误状态
  const [items, setItems] = useState<WallpaperItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWallpapers() {
      try {
        setLoading(true)
        const response = await fetch('/api/items?limit=20')
        
        if (!response.ok) {
          throw new Error('Failed to fetch wallpapers')
        }
        
        const data = await response.json()
        setItems(data.items || [])
      } catch (err) {
        console.error('Error fetching wallpapers:', err)
        setError('加载壁纸失败，请稍后重试')
      } finally {
        setLoading(false)
      }
    }

    fetchWallpapers()
  }, [])

  // 渲染状态：直接从核心数据推导
  if (loading) return <GridSkeleton />
  if (error) return <ErrorState error={error} />
  if (items.length === 0) return <EmptyState />

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3">
      {items.map((item) => (
        <WallpaperCard key={item.id} item={item} />
      ))}
    </div>
  )
}

// 单个壁纸卡片组件 - 职责单一
function WallpaperCard({ item }: { item: WallpaperItem }) {
  return (
    <Card className="break-inside-avoid mb-3 group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white rounded-2xl">
      <Link href={`/item/${item.id}`}>
        <div className="relative overflow-hidden rounded-t-2xl">
          <Image
            src={item.cover_url || "/placeholder.svg"}
            alt={item.title}
            width={240}
            height={300}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/50 rounded-full p-1.5">
              <Heart className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm mb-1 line-clamp-1 text-gray-900">
            {item.title}
          </h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
            {item.description || '精美的 Labubu 动态壁纸'}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{item.click_count?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>免费</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

// 错误状态组件 - 职责单一
function ErrorState({ error }: { error: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-red-500 mb-4">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="text-blue-500 hover:underline"
      >
        重新加载
      </button>
    </div>
  )
}

// 空状态组件 - 职责单一
function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">暂无壁纸数据</p>
    </div>
  )
}

// 骨架屏组件 - 职责单一
function GridSkeleton() {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3">
      {Array.from({ length: 18 }, (_, i) => (
        <SkeletonCard key={i} index={i} />
      ))}
    </div>
  )
}

// 单个骨架卡片 - 避免重复逻辑
function SkeletonCard({ index }: { index: number }) {
  const heights = ["h-64", "h-80", "h-56", "h-72", "h-96", "h-60"]
  const height = heights[index % 6]
  
  return (
    <div className="break-inside-avoid mb-3 bg-white rounded-2xl overflow-hidden animate-pulse">
      <div className={`w-full rounded-t-2xl bg-gray-200 ${height}`} />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="flex justify-between pt-1">
          <div className="h-3 bg-gray-200 rounded w-12" />
          <div className="h-3 bg-gray-200 rounded w-8" />
        </div>
      </div>
    </div>
  )
}
