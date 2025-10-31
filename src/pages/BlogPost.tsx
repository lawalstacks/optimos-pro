import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { useBlogPost } from '@/hooks/useBlog'
import { formatDate } from '@/lib/utils'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { post, loading, error } = useBlogPost(slug!)

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">Loading post...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-dark-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft size={20} className="mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-block mb-8">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={20} className="mr-2" />
              Back to Blog
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {post.image && (
              <div className="relative h-96 mb-8 rounded-3xl overflow-hidden bg-gradient-to-br from-primary-900/20 to-secondary-900/20">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-4 py-2 rounded-full bg-primary-500/20 text-primary-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-bold mb-6">{post.title}</h1>

            <div className="flex items-center gap-6 text-dark-400 mb-8 pb-8 border-b border-dark-800">
              <span className="flex items-center gap-2">
                <Calendar size={20} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <User size={20} />
                {post.author}
              </span>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-dark-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  )
}