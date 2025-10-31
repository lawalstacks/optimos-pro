import { motion } from 'framer-motion'
import { ArrowRight, Rocket, Lightbulb, TrendingUp } from 'lucide-react'
import Card from '@/components/ui/Card'

export default function Community() {
  const cards = [
    {
      icon: Rocket,
      title: 'Founders',
      description: 'Execute your ideas with different stacks of infrastructures, expert mentorship, funding and a collaborative community',
      cta: "Let's Build",
      color: 'primary',
      image: '/images/founders/placeholder.jpg'
    },
    {
      icon: Lightbulb,
      title: 'Mentors',
      description: 'Make a transformative impact with your expertise by guiding ambitious founders to achieve the impossible, and contribute to shaping the future of Web3.',
      cta: 'Become a Mentor',
      color: 'secondary',
      image: '/images/mentors/placeholder.jpg'
    },
    {
      icon: TrendingUp,
      title: 'Funders',
      description: 'Access exclusive early investment opportunities in Web3, discover and connect with high-potential 100X startups before everyone else.',
      cta: 'I want in',
      color: 'accent',
      image: '/images/funders/placeholder.jpg'
    }
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
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section id="community" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            A Startup by Community,
            <span className="block gradient-text">for Community</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Optimus PRO is more than a startup - we're a community-driven collective of passionate 
            individuals bound by a shared vision of a fair, secure and transparent Web3 ecosystem.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div key={card.title} variants={item}>
                <Card className="h-full flex flex-col">
                  <div className="relative h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-900/20 to-secondary-900/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={80} className={`text-${card.color}-400 opacity-30`} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-4 text-${card.color}-400`}>
                      {card.title}
                    </h3>
                    <p className="text-dark-300 mb-6">
                      {card.description}
                    </p>
                  </div>
                  
                  <button className={`flex items-center gap-2 text-${card.color}-400 font-semibold hover:gap-4 transition-all group`}>
                    {card.cta}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}