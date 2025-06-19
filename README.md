# Labubu Wallpapers

一个精美的 Labubu 动态壁纸分享网站，基于 Next.js 15 + Supabase 构建。

## ✨ 特性

- 🎨 **现代化设计** - 使用 Tailwind CSS + Shadcn UI 构建的美观界面
- 📱 **响应式布局** - 完美支持手机、平板、桌面设备
- 🔐 **安全认证** - 基于 Supabase Auth 的管理员登录系统  
- 📁 **文件管理** - 图片上传到 Supabase Storage，支持百度网盘分享
- 🔍 **内容管理** - 支持 Markdown 描述，标签分类
- 📊 **数据统计** - 实时点击计数，浏览量统计
- ⚡ **性能优化** - 图片懒加载，骨架屏，无限滚动

## 🛠 技术栈

- **前端**: Next.js 15 (App Router) + TypeScript + React 19
- **样式**: Tailwind CSS + Shadcn UI + Radix Primitives  
- **后端**: Supabase (Database + Auth + Storage)
- **部署**: Vercel
- **包管理**: pnpm

## 📦 项目结构

```
labubu-wallpapers/
├── app/                    # Next.js App Router 页面
│   ├── admin/             # 管理员页面
│   │   ├── login/         # 登录页面
│   │   └── upload/        # 上传页面
│   ├── api/               # API 路由
│   │   ├── items/         # 壁纸数据 API
│   │   └── increment_click/ # 点击统计 API
│   ├── download/[id]/     # 下载页面
│   ├── item/[id]/         # 壁纸详情页
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 可复用组件
│   ├── ui/               # UI 基础组件 (Shadcn)
│   └── wallpaper-grid.tsx # 壁纸网格组件
├── lib/                  # 工具库
│   ├── supabase/         # Supabase 客户端配置
│   ├── types.ts          # TypeScript 类型定义
│   └── utils.ts          # 工具函数
├── scripts/              # 数据库脚本
│   └── supabase-setup.sql # 数据库初始化脚本
└── middleware.ts         # 中间件（认证保护）
```

## 🚀 快速开始

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/your-username/labubu-wallpapers.git
cd labubu-wallpapers
```

2. **安装依赖**
```bash
pnpm install
```

3. **配置环境变量**
```bash
cp .env.example .env.local
```

编辑 `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **初始化数据库**
在 Supabase Dashboard 的 SQL Editor 中执行 `scripts/supabase-setup.sql`

5. **启动开发服务器**
```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

### Vercel 部署

#### 自动部署（推荐）

1. **连接 GitHub**
   - 将代码推送到 GitHub 仓库
   - 登录 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project" 导入 GitHub 仓库

2. **配置环境变量**
   在 Vercel 项目设置中添加环境变量：
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **自动部署**
   - 每次推送到 main 分支时自动部署
   - PR 预览部署
   - 零配置，开箱即用

#### 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel --prod
```

## 🗄 数据库配置

### Supabase 设置

1. **创建项目**
   在 [Supabase](https://supabase.com) 创建新项目

2. **执行 SQL 脚本**
   在 SQL Editor 中运行 `scripts/supabase-setup.sql`

3. **创建存储桶**
   - 桶名: `wallpapers`
   - 设置为公开访问
   - 允许上传: `image/*`

4. **创建管理员账号**
   在 Authentication > Users 中创建管理员用户

### 数据库表结构

- **wallpapers** - 壁纸数据表
  - id, title, description, cover_url, pan_link
  - click_count, created_at, updated_at, created_by

- **RLS 策略** - 行级安全策略
  - 公开读取壁纸数据
  - 认证用户可以上传和编辑

## 🔧 开发指南

### 添加新功能

1. **API 路由**: `app/api/` 目录下创建新的路由文件
2. **页面组件**: `app/` 目录下创建新页面
3. **UI 组件**: `components/` 目录下创建可复用组件
4. **类型定义**: `lib/types.ts` 中添加 TypeScript 类型

### 代码规范

- 使用 TypeScript 严格模式
- 组件采用函数式编程
- 遵循 SOLID 原则和 DRY 原则
- 状态管理采用就近原则
- 优先使用 Server Components

### 性能优化

- 图片使用 Next.js Image 组件
- API 路由支持分页和缓存
- 骨架屏提升用户体验
- 代码分割和懒加载

## 📱 功能介绍

### 用户功能
- 🏠 **首页浏览** - 瀑布流展示壁纸，响应式设计
- 🔍 **详情查看** - 高清预览，详细信息，使用指南
- 📥 **快速下载** - 百度网盘链接，一键跳转下载
- 📊 **实时统计** - 浏览量统计，热门推荐

### 管理功能  
- 🔐 **安全登录** - Supabase Auth 认证保护
- 📤 **内容上传** - 拖拽上传图片，Markdown 编辑器
- 🗂 **文件管理** - Supabase Storage 云存储
- 📝 **内容编辑** - 标题、描述、标签管理

## 🔒 安全特性

- **认证保护** - 管理页面需要登录验证
- **文件安全** - 上传文件类型和大小限制
- **数据安全** - Supabase RLS 行级安全策略
- **API 安全** - 请求频率限制和参数验证

## 🚀 性能指标

- **Lighthouse 评分** - 90+ 分
- **首屏加载** - < 2s (LCP)
- **交互响应** - < 100ms (FID)  
- **布局稳定** - < 0.1 (CLS)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 开源协议

[MIT License](LICENSE)

## 🔗 相关链接

- [线上演示](https://labubu-wallpapers.vercel.app)
- [设计稿](https://www.figma.com/...)
- [API 文档](https://github.com/your-username/labubu-wallpapers/wiki/API)
- [更新日志](CHANGELOG.md)

## ❓ 常见问题

### 部署相关

**Q: Vercel 部署失败怎么办？**
A: 检查环境变量配置，确保 Supabase 连接信息正确。

**Q: 图片上传失败？**  
A: 确认 Supabase Storage 桶已创建且权限配置正确。

**Q: 认证登录问题？**
A: 检查 Supabase Auth 配置，确认管理员账号已创建。

### 开发相关

**Q: 本地开发数据库连接失败？**
A: 检查 `.env.local` 文件配置，确认 Supabase 项目信息正确。

**Q: 类型错误如何解决？**
A: 运行 `pnpm run type-check` 检查类型，更新 `lib/types.ts` 类型定义。

---

**Made with ❤️ for Labubu lovers** 