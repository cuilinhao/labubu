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
import { createClient } from "@/lib/supabase/client"
import { v4 as uuidv4 } from "uuid"

export default function AdminUploadPage() {
  // 核心状态：表单数据
  const [formData, setFormData] = useState({
    title: "",
    panLink: "",
    description: "",
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  const { toast } = useToast()

  // 处理文件选择 - 统一的文件处理逻辑
  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) return
    
    setCoverFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setCoverPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 表单验证
    if (!coverFile || !formData.title || !formData.panLink || !formData.description) {
      toast({
        variant: "destructive",
        description: "请填写所有必填字段",
      })
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()

      // 验证登录状态
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({ variant: "destructive", description: "请先登录" })
        router.push("/admin/login")
        return
      }

      // 上传文件
      const filePath = await uploadFile(supabase, coverFile)
      
      // 获取公开 URL
      const { data: { publicUrl } } = supabase.storage
        .from('wallpapers')
        .getPublicUrl(filePath)

      // 保存到数据库
      const { error: dbError } = await supabase
        .from('wallpapers')
        .insert({
          title: formData.title,
          description: formData.description,
          cover_url: publicUrl,
          pan_link: formData.panLink,
          created_by: user.id,
        })

      if (dbError) {
        console.error('Database error:', dbError)
        // 清理已上传的文件
        await supabase.storage.from('wallpapers').remove([filePath])
        throw new Error('数据库保存失败')
      }

      toast({ description: "壁纸上传成功！" })
      router.push("/")
      
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        variant: "destructive",
        description: error instanceof Error ? error.message : "上传失败，请稍后重试",
      })
    } finally {
      setLoading(false)
    }
  }

  // 清除预览
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
            <p className="text-sm text-muted-foreground">
              添加新的 Labubu 动态壁纸到网站
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 封面上传区域 */}
              <FileUploadArea 
                coverPreview={coverPreview}
                onDrop={handleDrop}
                onChange={handleFileChange}
                onClear={clearCover}
              />

              {/* 表单字段 */}
              <FormFields formData={formData} setFormData={setFormData} />

              {/* 提交按钮 */}
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "上传中..." : (
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

// 文件上传区域组件 - 职责单一
function FileUploadArea({ 
  coverPreview, 
  onDrop, 
  onChange, 
  onClear 
}: {
  coverPreview: string | null
  onDrop: (e: React.DragEvent) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}) {
  return (
    <div className="space-y-2">
      <Label>封面图片 *</Label>
      {!coverPreview ? (
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
          onDrop={onDrop}
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
            src={coverPreview}
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
            onClick={onClear}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      <input 
        id="cover-upload" 
        type="file" 
        accept="image/*" 
        onChange={onChange} 
        className="hidden" 
      />
    </div>
  )
}

// 表单字段组件 - 职责单一
function FormFields({ 
  formData, 
  setFormData 
}: {
  formData: { title: string; panLink: string; description: string }
  setFormData: React.Dispatch<React.SetStateAction<typeof formData>>
}) {
  const updateField = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">标题 *</Label>
        <Input
          id="title"
          placeholder="例如：Labubu 梦幻森林"
          value={formData.title}
          onChange={updateField('title')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pan-link">百度网盘链接 *</Label>
        <Input
          id="pan-link"
          placeholder="https://pan.baidu.com/s/..."
          value={formData.panLink}
          onChange={updateField('panLink')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Markdown 描述 *</Label>
        <Textarea
          id="description"
          placeholder="使用 Markdown 格式描述这个壁纸..."
          value={formData.description}
          onChange={updateField('description')}
          rows={8}
          required
        />
        <p className="text-xs text-muted-foreground">
          支持 Markdown 语法，如 **粗体**、*斜体*、## 标题 等
        </p>
      </div>
    </>
  )
}

// 文件上传辅助函数 - 职责单一
async function uploadFile(supabase: any, file: File): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${uuidv4()}.${fileExt}`
  const filePath = `covers/${fileName}`

  const { error } = await supabase.storage
    .from('wallpapers')
    .upload(filePath, file)

  if (error) {
    console.error('Upload error:', error)
    throw new Error('文件上传失败')
  }

  return filePath
}
