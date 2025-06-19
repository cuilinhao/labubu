"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, ExternalLink, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { WallpaperItem } from "@/lib/types"

export default function DownloadPage() {
  const params = useParams()
  const id = params.id as string
  const [item, setItem] = useState<WallpaperItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        description: "链接已复制到剪贴板",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        variant: "destructive",
        description: "复制失败，请手动复制",
      })
    }
  }

  if (loading) {
    return <DownloadSkeleton />
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
          <Link href={`/item/${item.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回详情
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-32 relative rounded-lg overflow-hidden">
                  <Image
                    src={item.cover_url || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {item.description || '精美的 Labubu 动态壁纸'}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">动态壁纸</Badge>
                    <Badge variant="secondary">免费下载</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">下载链接</CardTitle>
              <p className="text-sm text-muted-foreground">
                请使用以下百度网盘链接下载壁纸文件
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pan Link */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">百度网盘链接</p>
                    <p className="font-mono text-sm break-all">{item.pan_link}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(item.pan_link || '')}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button asChild size="sm">
                      <Link href={item.pan_link || '#'} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        打开链接
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">下载步骤</h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs">1</span>
                    <span>点击上方"打开链接"按钮，跳转到百度网盘</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs">2</span>
                    <span>保存到自己的网盘或直接下载</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs">3</span>
                    <span>在设备上设置为动态壁纸即可使用</span>
                  </li>
                </ol>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💡 使用提示</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 部分设备需要安装动态壁纸应用才能使用</li>
                  <li>• 建议在WiFi环境下载，避免消耗过多流量</li>
                  <li>• 如果链接失效，请联系管理员更新</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link href={item.pan_link || '#'} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    立即下载
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/">
                    浏览更多
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// 下载页骨架屏
function DownloadSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-24 bg-gray-200 rounded mb-6 animate-pulse" />
        
        <div className="max-w-4xl mx-auto">
          <div className="h-32 bg-gray-200 rounded-lg mb-8 animate-pulse" />
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}
