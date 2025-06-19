# Labubu Wallpapers

高清 Labubu 动态壁纸聚合站，支持免费下载、后台上传与管理。基于 Next.js 15 App Router、TypeScript、Tailwind CSS、Shadcn UI、Radix Primitives 构建，前后端一体，结构清晰，易于扩展。

## 技术栈
- **Next.js 15 (App Router)**
- **React 19 + TypeScript**
- **Tailwind CSS** + **Shadcn UI** + **Radix UI**
- Mock 数据（可无缝对接 Supabase 等后端）

## 主要功能
- Labubu 高清壁纸瀑布流浏览
- 壁纸详情页、下载统计
- 管理端上传新壁纸（含图片、描述、网盘链接）
- 响应式设计，移动端友好
- UI 组件库：Shadcn + Radix + Tailwind
- Mock 数据，便于本地开发和二次开发

## 目录结构
```
app/                # Next.js App Router 目录
  ├─ admin/         # 管理端（登录、上传）
  ├─ api/           # Mock API 路由
  ├─ download/      # 下载页
  ├─ item/          # 壁纸详情页
  ├─ layout.tsx     # 全局布局
  └─ page.tsx       # 首页
components/         # UI 组件与业务组件
hooks/              # 自定义 hooks
lib/                # 工具函数
public/             # 静态资源
scripts/            # SQL 脚本（如需对接数据库）
styles/             # 全局样式
```

## 本地开发
1. 安装依赖：
   ```bash
   pnpm install
   ```
2. 启动开发服务器：
   ```bash
   pnpm dev
   ```
   默认访问：http://localhost:3000

## 构建与部署
```bash
pnpm build
pnpm start
```

> ⚠️ 当前为 mock 数据版本，无需数据库即可本地体验。对接 Supabase 只需替换 API 层。

## 常见问题
- **构建报错 /_document 缺失？**
  - App Router 项目无需 _document.tsx，部分 Next.js 版本有 bug，可忽略或升级依赖。
- **UI 样式不生效？**
  - 确认 Tailwind、Shadcn 依赖已安装，重启 dev 进程。
- **如何对接 Supabase？**
  - 替换 `app/api` 下 mock 逻辑，接入 Supabase SDK。

## 未来可扩展
- 接入 Supabase 实现真实数据存储、鉴权、上传
- 增加用户系统、收藏、评论等功能
- 优化 SEO、图片 CDN、WebP/AVIF 支持

---

> 代码有问题？别问低级问题，先看文档和报错，实在搞不定再来问我。 