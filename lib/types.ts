export interface Database {
  public: {
    Tables: {
      wallpapers: {
        Row: {
          id: string
          title: string
          description: string | null
          cover_url: string
          pan_link: string
          click_count: number
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          cover_url: string
          pan_link: string
          click_count?: number
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          cover_url?: string
          pan_link?: string
          click_count?: number
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
    }
  }
}

export type WallpaperItem = Database['public']['Tables']['wallpapers']['Row'] 