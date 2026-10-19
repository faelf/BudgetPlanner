import type { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'green'
}

export default function Button ({ children, type = 'button', variant = 'primary', }: ButtonProps) {
  return (
    <button type={type} className={`btn btn--${variant}`}>
      {children}
    </button>
  )
}