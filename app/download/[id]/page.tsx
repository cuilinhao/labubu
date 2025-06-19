"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Copy, CheckCircle, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DownloadInfo {
  id: string
  title: string
  pan_link: string
  extract_code: string
}

// Mock data - in real app this would come from Supabase
const mockDownloads: Record<string, DownloadInfo> = {
  "1": {
    id: "1",
    title: "Labubu 梦幻森林",
    pan_link: "https://pan.baidu.com/s/1234567890abcdef",
    extract_code: "12ab",
  },
}

export default function DownloadPage({
  params,
}: {
  params: { id: string }
}) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const { toast } = useToast()

  const downloadInfo = mockDownloads[params.id]

  if (!downloadInfo) {
    return <div>资源不存在</div>
  }

  const copyToClipboard = async (text: string, type: "link" | "code") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "link") {
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
      } else {
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
      }
      toast({
        description: `${type === "link" ? "链接" : "提取码"}已复制到剪贴板`,
      })
    } catch (err) {
      toast({
        variant: "destructive",
        description: "复制失败，请手动复制",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-xl">资源已就绪</CardTitle>
          <p className="text-sm text-muted-foreground">{downloadInfo.title}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">百度网盘链接</label>
            <div className="flex gap-2">
              <div className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">{downloadInfo.pan_link}</div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(downloadInfo.pan_link, "link")}
                className="shrink-0"
              >
                {copiedLink ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">提取码</label>
            <div className="flex gap-2">
              <div className="flex-1 p-2 bg-muted rounded text-sm font-mono text-center">
                {downloadInfo.extract_code}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(downloadInfo.extract_code, "code")}
                className="shrink-0"
              >
                {copiedCode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <a href={downloadInfo.pan_link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                打开百度网盘
              </a>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
