import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, User } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useBlogPosts } from '@/hooks/useBlog'
import { formatDate } from '@/lib/utils'

export default function Blog() {
  const { posts, loading } = useBlogPosts()
  const latestPosts = posts.filter(p => p.published).slice(0, 3)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  if (loading) {
    return (
      <section id="blog" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">Loading blog posts...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">Latest from Blog</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/blog">
              <Button variant="outline" className="group">
                View All Blogs
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {latestPosts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <Link to={`/blog/${post.slug}`}>
                <Card className="h-full flex flex-col group">
                  {post.image && (
                    <div className="relative h-48 mb-6 rounded-2xl overflow-hidden bg-linear-to-br from-primary-900/20 to-secondary-900/20">
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
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-dark-300 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary-400 font-semibold group-hover:gap-4 transition-all">
                    Read Article
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}