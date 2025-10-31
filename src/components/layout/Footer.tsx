import { Link } from 'react-router-dom'
import { Twitter, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="border-t border-dark-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <Link to="/" className="text-2xl font-bold gradient-text inline-block mb-4">
              Optimus PRO
            </Link>
            <p className="text-dark-300 mb-4 max-w-md">
              Optimus PRO is a community-driven Web3 ecosystem that is built on the foundation of trust, 
              security, and transparency. It's a decentralized space co-built by stakeholders like you, 
              where every voice matters.
            </p>
            <a
              href="mailto:hello@optimuspro.io"
              className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <Mail size={20} />
              hello@optimuspro.io
            </a>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6">
            <div>
              <h3 className="font-bold mb-4 text-dark-100">Let's Connect</h3>
              <p className="text-dark-300 mb-4 md:text-right max-w-md">
                Reach out to us for inquiries, collaborations, partnerships, or just say hello!
              </p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary-500/20 hover:border-primary-500 transition-all"
                >
                  <social.icon size={20} className="text-primary-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-dark-400 text-sm pt-8 border-t border-dark-800">
          © {new Date().getFullYear()} Optimus PRO Inc. All Rights Reserved
        </div>
      </div>
    </footer>
  )
}