import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import HeroScene from '@/components/3d/HeroScene'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Building the Future,
            <span className="block gradient-text">One Block at a Time</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-dark-300 leading-relaxed">
            Join us - the Crazy Ones, the Optimists, the Misfits, the Underdogs and the Rebels, 
            and together let's push the boundaries of Web3 with bold, groundbreaking ideas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">Join the Community</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  )
}