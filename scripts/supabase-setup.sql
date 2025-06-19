-- 创建壁纸表
CREATE TABLE IF NOT EXISTS wallpapers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT NOT NULL,
  pan_link TEXT NOT NULL,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- 创建存储桶 (需要在 Supabase Dashboard 中手动创建)
-- Bucket name: wallpapers
-- Public: true

-- 设置存储桶策略
INSERT INTO storage.buckets (id, name, public) VALUES ('wallpapers', 'wallpapers', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 存储策略：允许公开读取
CREATE POLICY "Public can view wallpaper files" ON storage.objects 
FOR SELECT USING (bucket_id = 'wallpapers');

-- 存储策略：登录用户可以上传
CREATE POLICY "Authenticated users can upload wallpaper files" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'wallpapers' AND auth.role() = 'authenticated');

-- 存储策略：用户可以更新自己上传的文件
CREATE POLICY "Users can update own wallpaper files" ON storage.objects 
FOR UPDATE USING (bucket_id = 'wallpapers' AND auth.uid() = owner);

-- 存储策略：用户可以删除自己上传的文件
CREATE POLICY "Users can delete own wallpaper files" ON storage.objects 
FOR DELETE USING (bucket_id = 'wallpapers' AND auth.uid() = owner);

-- 启用 RLS
ALTER TABLE wallpapers ENABLE ROW LEVEL SECURITY;

-- RLS 策略：所有人可以查看壁纸
CREATE POLICY "Anyone can view wallpapers" ON wallpapers 
FOR SELECT USING (true);

-- RLS 策略：登录用户可以插入壁纸
CREATE POLICY "Authenticated users can insert wallpapers" ON wallpapers 
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS 策略：用户可以更新自己创建的壁纸
CREATE POLICY "Users can update own wallpapers" ON wallpapers 
FOR UPDATE USING (auth.uid() = created_by);

-- 创建 RPC 函数来安全地增加点击计数（绕过 RLS）
CREATE OR REPLACE FUNCTION increment_wallpaper_click_count(wallpaper_id UUID)
RETURNS JSON AS $$
DECLARE
  result_row wallpapers%ROWTYPE;
BEGIN
  UPDATE wallpapers 
  SET click_count = click_count + 1
  WHERE id = wallpaper_id
  RETURNING * INTO result_row;
  
  IF result_row.id IS NULL THEN
    RETURN json_build_object('error', 'Wallpaper not found');
  END IF;
  
  RETURN json_build_object(
    'success', true,
    'click_count', result_row.click_count
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建更新 updated_at 的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_wallpapers_updated_at 
BEFORE UPDATE ON wallpapers 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入示例数据
INSERT INTO wallpapers (title, description, cover_url, pan_link, click_count) VALUES
('Labubu 梦幻森林', '可爱的Labubu在神秘森林中的奇幻冒险，4K高清动态壁纸', '/placeholder.svg?height=320&width=240&text=梦幻森林', 'https://pan.baidu.com/s/example1', 1234),
('Labubu 星空漫步', '浪漫星空下的Labubu，治愈系动态壁纸', '/placeholder.svg?height=400&width=240&text=星空漫步', 'https://pan.baidu.com/s/example2', 856),
('Labubu 彩虹世界', '七彩斑斓的彩虹世界，Labubu带你进入童话', '/placeholder.svg?height=280&width=240&text=彩虹世界', 'https://pan.baidu.com/s/example3', 2341),
('Labubu 海底奇遇', '深海探险记，与海洋生物的奇妙邂逅', '/placeholder.svg?height=360&width=240&text=海底奇遇', 'https://pan.baidu.com/s/example4', 567),
('Labubu 花园派对', '春日花园里的欢乐聚会，温馨治愈', '/placeholder.svg?height=450&width=240&text=花园派对', 'https://pan.baidu.com/s/example5', 1789)
ON CONFLICT DO NOTHING; 