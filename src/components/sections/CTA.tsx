import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-dark rounded-3xl p-12 overflow-hidden"
        >
          <div className="absolute inset-0 gradient-cyan opacity-10" />
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 mb-6"
            >
              <Sparkles size={32} className="text-primary-400" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Build the Future with Optimus PRO
            </h2>
            
            <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
              Ready to be part of our passionate and ambitious team? Apply now and join us in 
              revolutionizing the Web3 ecosystem.
            </p>
            
            <Button size="lg" className="group">
              Join Our Team
              <Sparkles size={20} className="ml-2 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-secondary-500/20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}