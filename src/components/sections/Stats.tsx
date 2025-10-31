import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

export default function Stats() {
  const stats = [
    { number: '125+', label: 'Co-builders' },
    { number: '4', label: 'Products in development' },
    { number: '15k', label: 'Wait-listed users' }
  ]

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

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Story In Numbers</h2>
          <p className="text-xl text-dark-300">
            Let's Stats speak about our passion for building the future.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={item}>
              <Card hover={false} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
                  className="text-6xl md:text-7xl font-bold gradient-text mb-4"
                >
                  {stat.number}
                </motion.div>
                <div className="text-xl text-dark-300">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}