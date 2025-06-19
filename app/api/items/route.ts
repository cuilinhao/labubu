import { type NextRequest, NextResponse } from "next/server"

// Mock data - in real app this would query Supabase
const mockItems = [
  {
    id: "1",
    title: "Labubu 梦幻森林",
    cover_url: "/placeholder.svg?height=400&width=300",
    click_count: 1234,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Labubu 星空漫步",
    cover_url: "/placeholder.svg?height=500&width=300",
    click_count: 856,
    created_at: "2024-01-14T00:00:00Z",
  },
  {
    id: "3",
    title: "Labubu 彩虹世界",
    cover_url: "/placeholder.svg?height=350&width=300",
    click_count: 2341,
    created_at: "2024-01-13T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  // Simulate database query with pagination
  const paginatedItems = mockItems.slice(offset, offset + limit)

  return NextResponse.json({
    items: paginatedItems,
    total: mockItems.length,
    hasMore: offset + limit < mockItems.length,
  })
}
