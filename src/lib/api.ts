import { BlogPost, BlogFormData } from '@/types/blog'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${API_URL}/api/posts`)
  if (!response.ok) throw new Error('Failed to fetch posts')
  return response.json()
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const response = await fetch(`${API_URL}/api/posts/${slug}`)
  if (!response.ok) throw new Error('Failed to fetch post')
  return response.json()
}

export async function createBlogPost(data: BlogFormData, token: string): Promise<BlogPost> {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Failed to create post')
  return response.json()
}

export async function updateBlogPost(id: string, data: BlogFormData, token: string): Promise<BlogPost> {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Failed to update post')
  return response.json()
}

export async function deleteBlogPost(id: string, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  if (!response.ok) throw new Error('Failed to delete post')
}

export async function login(email: string, password: string): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  if (!response.ok) throw new Error('Login failed')
  return response.json()
}