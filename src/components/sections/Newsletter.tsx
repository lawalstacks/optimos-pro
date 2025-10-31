import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 mb-6">
            <Mail size={32} className="text-primary-400" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated on Our Journey
          </h2>
          
          <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
            Join our newsletter to receive regular updates on our progress, product developments, 
            and exciting news from our team.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="flex-1 px-6 py-3 bg-dark-900/50 border border-dark-700 rounded-full focus:outline-none focus:border-primary-500 transition text-dark-100 placeholder:text-dark-500"
            />
            <Button 
              type="submit" 
              disabled={status === 'loading'}
              className="group"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-primary-400"
            >
              Thanks for subscribing!
            </motion.p>
          )}

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-400"
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}