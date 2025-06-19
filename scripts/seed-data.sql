-- Insert sample admin user
insert into public.profiles (id, email, is_admin) values 
  ('00000000-0000-0000-0000-000000000001', 'admin@labubu.com', true);

-- Insert sample wallpaper items
insert into public.items (id, title, description_md, cover_url, pan_link, click_count) values 
  (
    '00000000-0000-0000-0000-000000000001',
    'Labubu 梦幻森林',
    '# Labubu 梦幻森林动态壁纸

这是一款精美的 Labubu 主题动态壁纸，展现了可爱的 Labubu 在梦幻森林中的冒险场景。

## 特色功能
- **高清画质**：支持 4K 分辨率
- **流畅动画**：60fps 丝滑体验  
- **低功耗**：优化算法，省电模式
- **多设备适配**：支持手机、平板、电脑

## 使用说明
1. 下载壁纸文件
2. 在设备上设置为动态壁纸
3. 享受 Labubu 的可爱陪伴

*注意：部分设备可能需要安装动态壁纸应用*',
    'https://example.com/covers/forest.jpg',
    'https://pan.baidu.com/s/1234567890abcdef',
    1234
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Labubu 星空漫步',
    '# Labubu 星空漫步动态壁纸

跟随 Labubu 一起在璀璨星空中漫步，感受宇宙的神秘与浪漫。

## 特色功能
- **星空动画**：真实星空运动轨迹
- **音效同步**：可选择配套音效
- **夜间模式**：护眼暗色调
- **互动元素**：触摸屏幕有惊喜

适合喜欢宁静夜空的用户使用。',
    'https://example.com/covers/starry.jpg',
    'https://pan.baidu.com/s/2345678901bcdefg',
    856
  );
