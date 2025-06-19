"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Save, Eye, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminUploadPage() {
  const [title, setTitle] = useState("")
  const [panLink, setPanLink] = useState("")
  const [description, setDescription] = useState("")
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!coverFile || !title || !panLink || !description) {
      toast({
        variant: "destructive",
        description: "请填写所有必填字段",
      })
      return
    }

    setLoading(true)

    // Mock upload - in real app this would upload to Supabase Storage and save to DB
    setTimeout(() => {
      toast({
        description: "壁纸上传成功！",
      })
      router.push("/")
      setLoading(false)
    }, 2000)
  }

  const clearCover = () => {
    setCoverFile(null)
    setCoverPreview(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">上传新壁纸</CardTitle>
            <p className="text-sm text-muted-foreground">添加新的 Labubu 动态壁纸到网站</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cover Upload */}
              <div className="space-y-2">
                <Label>封面图片 *</Label>
                {!coverPreview ? (
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById("cover-upload")?.click()}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">拖拽图片到此处或点击上传</p>
                    <p className="text-xs text-muted-foreground mt-1">支持 JPG, PNG, WebP 格式</p>
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      src={coverPreview || "/placeholder.svg"}
                      alt="Cover preview"
                      width={400}
                      height={300}
                      className="w-full max-w-sm mx-auto rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={clearCover}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <input id="cover-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">标题 *</Label>
                <Input
                  id="title"
                  placeholder="例如：Labubu 梦幻森林"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Pan Link */}
              <div className="space-y-2">
                <Label htmlFor="pan-link">百度网盘链接 *</Label>
                <Input
                  id="pan-link"
                  placeholder="https://pan.baidu.com/s/..."
                  value={panLink}
                  onChange={(e) => setPanLink(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Markdown 描述 *</Label>
                <Textarea
                  id="description"
                  placeholder="使用 Markdown 格式描述这个壁纸..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  required
                />
                <p className="text-xs text-muted-foreground">支持 Markdown 语法，如 **粗体**、*斜体*、## 标题 等</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    "上传中..."
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      保存并发布
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  预览
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
