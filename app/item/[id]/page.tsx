import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Eye } from "lucide-react"

interface WallpaperItem {
  id: string
  title: string
  description_md: string
  cover_url: string
  click_count: number
  created_at: string
}

// Mock data - in real app this would come from Supabase
const mockItems: Record<string, WallpaperItem> = {
  "1": {
    id: "1",
    title: "Labubu 梦幻森林",
    description_md: `# Labubu 梦幻森林动态壁纸

这是一款精美的 Labubu 主题动态壁纸，展现了可爱的 Labubu 在梦幻森林中的冒险场景。

![Labubu在森林中探险](/placeholder.svg?height=300&width=500&text=森林探险场景)

## 特色功能
- **高清画质**：支持 4K 分辨率
- **流畅动画**：60fps 丝滑体验  
- **低功耗**：优化算法，省电模式
- **多设备适配**：支持手机、平板、电脑

![Labubu与森林小动物互动](/placeholder.svg?height=250&width=500&text=与小动物互动)

## 使用说明
1. 下载壁纸文件
2. 在设备上设置为动态壁纸
3. 享受 Labubu 的可爱陪伴

## 预览效果

下面是壁纸的动态效果预览：

![动态效果预览图](/placeholder.svg?height=350&width=500&text=动态效果预览)

*注意：部分设备可能需要安装动态壁纸应用*

## 技术参数
- **分辨率**：3840×2160 (4K)
- **帧率**：60 FPS
- **文件大小**：约 15MB
- **支持格式**：MP4, Live Photo`,
    cover_url: "/placeholder.svg?height=600&width=400",
    click_count: 1234,
    created_at: "2024-01-15",
  },
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = mockItems[id]

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8">
          {/* Hero Image */}
          <Card className="overflow-hidden">
            <div className="relative max-h-[70vh] overflow-hidden">
              <Image
                src={item.cover_url || "/placeholder.svg"}
                alt={item.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </Card>

          {/* Content */}
          <div className="grid gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(item.created_at).toLocaleDateString("zh-CN")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{item.click_count} 次查看</span>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div
                  className="prose prose-gray max-w-none dark:prose-invert prose-img:rounded-lg prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{
                    __html: item.description_md
                      .replace(/\n/g, "<br>")
                      .replace(/## (.*)/g, "<h2 class='text-xl font-bold mt-6 mb-3 text-gray-800'>$1</h2>")
                      .replace(/# (.*)/g, "<h1 class='text-2xl font-bold mt-8 mb-4 text-gray-900'>$1</h1>")
                      .replace(
                        /!\[(.*?)\]$$(.*?)$$/g,
                        '<img src="$2" alt="$1" class="w-full max-w-lg mx-auto my-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" />',
                      )
                      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-purple-700'>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>"),
                  }}
                />
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Link href={`/download/${item.id}`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  获取百度网盘链接
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
