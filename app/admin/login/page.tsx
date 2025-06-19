"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, LogIn } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock login - 账号：admin，密码：123456
    setTimeout(() => {
      if (account === "admin" && password === "123456") {
        // 设置登录状态 cookie
        document.cookie = "admin-session=true; path=/; max-age=86400" // 24小时有效
        
        toast({
          description: "登录成功",
        })
        
        // 延迟跳转，确保 cookie 已设置
        setTimeout(() => {
          router.push("/admin/upload")
        }, 500)
      } else {
        toast({
          variant: "destructive",
          description: "账号或密码错误",
        })
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">管理员登录</CardTitle>
          <p className="text-sm text-muted-foreground">请输入您的管理员凭据</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account">账号</Label>
              <Input
                id="account"
                type="text"
                placeholder="admin"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  "登录中..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    登录
                  </>
                )}
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </Link>
              </Button>
            </div>
          </form>

          <div className="mt-4 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
            <strong>演示账号：</strong>
            <br />
            账号: admin
            <br />
            密码: 123456
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
