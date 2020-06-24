
import './style.css'

export const PillButton = ({ href, className, type, ...rest }, children) => (
  href ? (
    <a className={`pill-button${className ? ' ' + className : ''}`} href={href} {...rest}>
      {children}
    </a>
  ) : (
    <button className={`pill-button${className ? ' ' + className : ''}`} type={type || 'button'} {...rest}>
      {children}
    </button>
  )
)
