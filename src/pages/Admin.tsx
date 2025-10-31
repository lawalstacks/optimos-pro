import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {  Edit, Trash2, LogOut, Eye, EyeOff } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { BlogPost, BlogFormData } from '@/types/blog'
import { login, fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/api'
import {  formatDate } from '@/lib/utils'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [token, setToken] = useState('')
  
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    author: 'OptimusPro',
    image: '',
    tags: [],
    published: false
  })

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
      loadPosts()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      const response = await login(email, password)
      setToken(response.token)
      localStorage.setItem('admin_token', response.token)
      setIsAuthenticated(true)
      loadPosts()
    } catch (error) {
      setLoginError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setToken('')
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  const loadPosts = async () => {
    try {
      const data = await fetchBlogPosts()
      setPosts(data)
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (currentPost) {
        await updateBlogPost(currentPost.id, formData, token)
      } else {
        await createBlogPost(formData, token)
      }
      
      loadPosts()
      resetForm()
    } catch (error) {
      console.error('Failed to save post:', error)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      image: post.image,
      tags: post.tags,
      published: post.published
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      await deleteBlogPost(id, token)
      loadPosts()
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  const resetForm = () => {
    setIsEditing(false)
    setCurrentPost(null)
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'OptimusPro',
      image: '',
      tags: [],
      published: false
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card>
            <h1 className="text-3xl font-bold mb-2 gradient-text text-center">Admin Login</h1>
            <p className="text-dark-400 text-center mb-8">Sign in to manage blog posts</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl focus:outline-none focus:border-primary-500 transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl focus:outline-none focus:border-primary-500 transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <p className="text-red-400 text-sm">{loginError}</p>
              )}

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Blog Management</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl focus:outline-none focus:border-primary-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl focus:outline-none focus:border-primary-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content (HTML)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={10}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl focus:outline-none focus:border-primary-500 transition resize-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl focus:outline-none focus:border-primary-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl focus:outline-none focus:border-primary-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  })}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl focus:outline-none focus:border-primary-500 transition"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-dark-700 bg-dark-900/50 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="published" className="text-sm font-medium">
                  Published
                </label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {isEditing ? 'Update Post' : 'Create Post'}
                </Button>
                {isEditing && (
                  <Button type="button" onClick={resetForm} variant="outline">
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">All Posts ({posts.length})</h2>
            
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
              {posts.map((post) => (
                <Card key={post.id} hover={false} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <p className="text-sm text-dark-400">
                        {formatDate(post.date)} • {post.author}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      post.published 
                        ? 'bg-primary-500/20 text-primary-400' 
                        : 'bg-dark-700 text-dark-400'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  <p className="text-dark-300 text-sm mb-4">{post.excerpt}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-3 py-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition text-sm flex items-center gap-2"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}