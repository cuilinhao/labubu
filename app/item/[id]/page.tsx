"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Eye, Heart, Share } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { WallpaperItem } from "@/lib/types"

export default function ItemDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [item, setItem] = useState<WallpaperItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchItem() {
      try {
        setLoading(true)
        const response = await fetch(`/api/items/${id}`)
        
        if (response.status === 404) {
          setError('壁纸不存在')
          return
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch item')
        }
        
        const data = await response.json()
        setItem(data)
      } catch (err) {
        console.error('Error fetching item:', err)
        setError('加载失败，请稍后重试')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchItem()
    }
  }, [id])

  const handleDownload = async () => {
    if (!item) return
    
    try {
      // 增加点击计数
      await fetch('/api/increment_click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: item.id }),
      })

      // 更新本地显示的点击数
      setItem(prev => prev ? {
        ...prev,
        click_count: (prev.click_count || 0) + 1
      } : null)

      toast({
        description: "感谢下载！正在跳转到下载页面...",
      })
      
      // 跳转到下载页面
      window.location.href = `/download/${item.id}`
    } catch (error) {
      console.error('Error updating click count:', error)
      // 即使更新失败也允许下载
      window.location.href = `/download/${item.id}`
    }
  }

  if (loading) {
    return <DetailSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <div className="space-y-2">
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Link>
              </Button>
              <br />
              <Button 
                onClick={() => window.location.reload()} 
                variant="ghost"
              >
                重新加载
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!item) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Cover Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-[3/4] relative">
                <Image
                  src={item.cover_url || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={handleDownload} size="lg" className="w-full">
                <Download className="w-5 h-5 mr-2" />
                立即下载
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5 mr-2" />
                收藏
              </Button>
            </div>
            <Button variant="outline" size="lg" className="w-full">
              <Share className="w-5 h-5 mr-2" />
              分享
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{item.click_count?.toLocaleString() || 0} 次查看</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>免费下载</span>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <Badge variant="secondary">动态壁纸</Badge>
                <Badge variant="secondary">Labubu</Badge>
                <Badge variant="secondary">高清</Badge>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">壁纸介绍</h2>
                <div className="prose prose-sm max-w-none">
                  {item.description ? (
                    <div dangerouslySetInnerHTML={{ 
                      __html: item.description.replace(/\n/g, '<br>')
                    }} />
                  ) : (
                    <p>暂无详细介绍</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Download Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">下载信息</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>文件格式</span>
                    <span>MP4 / GIF</span>
                  </div>
                  <div className="flex justify-between">
                    <span>分辨率</span>
                    <span>1080P / 4K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>文件大小</span>
                    <span>约 10-50MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>支持设备</span>
                    <span>手机 / 平板 / 电脑</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// 详情页骨架屏
function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-24 bg-gray-200 rounded mb-6 animate-pulse" />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6 animate-pulse" />
              <div className="flex gap-2 mb-6">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            
            <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-40 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
