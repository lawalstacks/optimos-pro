import { motion } from 'framer-motion'
import { Users, Code, DollarSign, Heart } from 'lucide-react'
import Card from '@/components/ui/Card'

export default function Features() {
  const features = [
    {
      icon: Users,
      title: 'Talent',
      subtitle: 'Talent Layer',
      description: 'Connect with culture-fit talents, contributors, collaborators, promoters, and startup programs. Begin your entrepreneurial journey with a community that backs you from day one.'
    },
    {
      icon: Code,
      title: 'Tech',
      subtitle: 'Technical Infrastructure',
      description: 'Access cutting-edge Web3 technology stack and development tools to bring your innovative ideas to life with robust and scalable solutions.'
    },
    {
      icon: DollarSign,
      title: 'Financial',
      subtitle: 'Financial Support',
      description: 'Get funding opportunities and financial resources to scale your Web3 projects and reach global markets with confidence.'
    },
    {
      icon: Heart,
      title: 'Support',
      subtitle: 'Community Support',
      description: 'Join a passionate community of builders, mentors, and supporters dedicated to your success and growth in the Web3 space.'
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  }

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Driving Innovation and Collaboration in Web3
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Empowering misfits, underdogs, bold innovators and disruptors from ideation with the 
            infrastructure, support, resources and community they need to build and shape the future.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={item}>
                <Card className="h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-2xl glass-dark">
                      <Icon size={32} className="text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-primary-400 font-semibold">{feature.title}</p>
                      <h3 className="text-2xl font-bold text-dark-50">{feature.subtitle}</h3>
                    </div>
                  </div>
                  <p className="text-dark-300">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}