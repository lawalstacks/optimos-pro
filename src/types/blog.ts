export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  image?: string
  tags?: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogFormData {
  title: string
  excerpt: string
  content: string
  author: string
  image?: string
  tags?: string[]
  published: boolean
}