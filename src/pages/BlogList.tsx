import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import { useBlogPosts } from '@/hooks/useBlog'
import { formatDate } from '@/lib/utils'

export default function BlogList() {
  const { posts, loading, error } = useBlogPosts()
  const publishedPosts = posts.filter(p => p.published)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Insights, updates, and stories from the Optimus PRO community
            </p>
          </motion.div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-pulse">Loading posts...</div>
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-red-400">
              Error: {error}
            </div>
          )}

          {!loading && !error && publishedPosts.length === 0 && (
            <div className="text-center py-20 text-dark-400">
              No blog posts yet. Check back soon!
            </div>
          )}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {publishedPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full flex flex-col group">
                    {post.image && (
                      <div className="relative h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-900/20 to-secondary-900/20">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-dark-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={16} />
                        {post.author}
                      </span>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-primary-500/20 text-primary-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-dark-300 mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-primary-400 font-semibold group-hover:gap-4 transition-all">
                      Read More
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}