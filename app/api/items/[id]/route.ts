import { type NextRequest, NextResponse } from "next/server"

// Mock data - in real app this would query Supabase
const mockItems: Record<string, any> = {
  "1": {
    id: "1",
    title: "Labubu 梦幻森林",
    description_md: `# Labubu 梦幻森林动态壁纸

这是一款精美的 Labubu 主题动态壁纸，展现了可爱的 Labubu 在梦幻森林中的冒险场景。

## 特色功能
- **高清画质**：支持 4K 分辨率
- **流畅动画**：60fps 丝滑体验  
- **低功耗**：优化算法，省电模式
- **多设备适配**：支持手机、平板、电脑`,
    cover_url: "/placeholder.svg?height=600&width=400",
    pan_link: "https://pan.baidu.com/s/1234567890abcdef",
    click_count: 1234,
    created_at: "2024-01-15T00:00:00Z",
  },
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = mockItems[id]

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  return NextResponse.json(item)
}
