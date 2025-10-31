import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Community from '@/components/sections/Community'
import Features from '@/components/sections/Features'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'
import Blog from '@/components/sections/Blog'
import CTA from '@/components/sections/CTA'
import Newsletter from '@/components/sections/Newsletter'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Community />
      <Features />
      <Stats />
      <Testimonials />
      <Blog />
      <CTA />
      <Newsletter />
      <Footer />
    </div>
  )
}