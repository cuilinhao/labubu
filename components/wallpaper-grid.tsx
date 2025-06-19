"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Download, Heart } from "lucide-react"

interface WallpaperItem {
  id: string
  title: string
  cover_url: string
  click_count: number
  created_at: string
  description: string
}

// 更新mock数据，添加描述和更多样的高度
const mockItems: WallpaperItem[] = [
  {
    id: "1",
    title: "Labubu 梦幻森林",
    description: "可爱的Labubu在神秘森林中的奇幻冒险，4K高清动态壁纸",
    cover_url: "/placeholder.svg?height=320&width=240&text=梦幻森林",
    click_count: 1234,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    title: "Labubu 星空漫步",
    description: "浪漫星空下的Labubu，治愈系动态壁纸",
    cover_url: "/placeholder.svg?height=400&width=240&text=星空漫步",
    click_count: 856,
    created_at: "2024-01-14",
  },
  {
    id: "3",
    title: "Labubu 彩虹世界",
    description: "七彩斑斓的彩虹世界，Labubu带你进入童话",
    cover_url: "/placeholder.svg?height=280&width=240&text=彩虹世界",
    click_count: 2341,
    created_at: "2024-01-13",
  },
  {
    id: "4",
    title: "Labubu 海底奇遇",
    description: "深海探险记，与海洋生物的奇妙邂逅",
    cover_url: "/placeholder.svg?height=360&width=240&text=海底奇遇",
    click_count: 567,
    created_at: "2024-01-12",
  },
  {
    id: "5",
    title: "Labubu 花园派对",
    description: "春日花园里的欢乐聚会，温馨治愈",
    cover_url: "/placeholder.svg?height=450&width=240&text=花园派对",
    click_count: 1789,
    created_at: "2024-01-11",
  },
  {
    id: "6",
    title: "Labubu 太空探险",
    description: "宇宙冒险家Labubu的星际之旅",
    cover_url: "/placeholder.svg?height=300&width=240&text=太空探险",
    click_count: 934,
    created_at: "2024-01-10",
  },
  {
    id: "7",
    title: "Labubu 冰雪王国",
    description: "冰雪奇缘般的梦幻世界，纯净美好",
    cover_url: "/placeholder.svg?height=380&width=240&text=冰雪王国",
    click_count: 1456,
    created_at: "2024-01-09",
  },
  {
    id: "8",
    title: "Labubu 音乐盒",
    description: "旋转的音乐盒里，Labubu翩翩起舞",
    cover_url: "/placeholder.svg?height=420&width=240&text=音乐盒",
    click_count: 723,
    created_at: "2024-01-08",
  },
  {
    id: "9",
    title: "Labubu 魔法学院",
    description: "霍格沃茨风格的魔法世界冒险",
    cover_url: "/placeholder.svg?height=340&width=240&text=魔法学院",
    click_count: 1122,
    created_at: "2024-01-07",
  },
  {
    id: "10",
    title: "Labubu 樱花季",
    description: "粉色樱花飞舞，浪漫春日时光",
    cover_url: "/placeholder.svg?height=480&width=240&text=樱花季",
    click_count: 1888,
    created_at: "2024-01-06",
  },
  {
    id: "11",
    title: "Labubu 咖啡时光",
    description: "慵懒午后的咖啡馆，温暖惬意",
    cover_url: "/placeholder.svg?height=260&width=240&text=咖啡时光",
    click_count: 645,
    created_at: "2024-01-05",
  },
  {
    id: "12",
    title: "Labubu 夜市漫游",
    description: "霓虹闪烁的夜市，热闹非凡",
    cover_url: "/placeholder.svg?height=390&width=240&text=夜市漫游",
    click_count: 1567,
    created_at: "2024-01-04",
  },
]

export default function WallpaperGrid() {
  const [items, setItems] = useState<WallpaperItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItems(mockItems)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3">
      {items.map((item) => (
        <Card
          key={item.id}
          className="break-inside-avoid mb-3 group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white rounded-2xl"
        >
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
              <h3 className="font-semibold text-sm mb-1 line-clamp-1 text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">{item.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{item.click_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>免费</span>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
