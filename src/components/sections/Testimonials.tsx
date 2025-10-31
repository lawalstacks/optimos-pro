import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Card from '@/components/ui/Card'

export default function Testimonials() {
  const testimonials = [
    {
      text: "Optimus PRO has been an amazing project all through its journey from ideation to product launch and I so much believe in their vision to on board the next Billion users into the Web3 space.",
      author: "Industry Leader",
      role: "CEO, Web3 Company"
    },
    {
      text: "I've witnessed Optimus PRO's remarkable growth and innovation in Web3 solutions. Their team's dedication to addressing real-world problems with groundbreaking applications is inspiring, and their commitment to making a meaningful impact shines through in everything they do.",
      author: "Web3 Pioneer",
      role: "Founder, Blockchain Startup"
    },
    {
      text: "Never doubt a group of people who believe they can change the world and are collectively building towards that. Optimus PRO is that team, watch out for them in this space.",
      author: "Tech Visionary",
      role: "Investor & Advisor"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Don't Take Our Word for it</h2>
          <p className="text-xl text-dark-300">
            Here's what industry leaders are saying about us
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full flex flex-col">
                <Quote size={40} className="text-primary-400 mb-4 opacity-50" />
                <p className="text-dark-300 mb-6 italic flex-1">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-dark-800 pt-4">
                  <p className="text-primary-400 font-semibold">{testimonial.author}</p>
                  <p className="text-dark-400 text-sm">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}