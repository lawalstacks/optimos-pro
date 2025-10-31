import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'gradient-cyan text-white btn-glow hover:scale-105': variant === 'primary',
            'bg-secondary-600 text-white hover:bg-secondary-700': variant === 'secondary',
            'glass border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10': variant === 'outline',
            'text-primary-400 hover:bg-primary-500/10': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button