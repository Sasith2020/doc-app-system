import { useEffect } from 'react'
import type { ReactNode } from 'react'

type PopupVariant = 'default' | 'info' | 'warning' | 'danger' | 'success'

type PopupAction = {
  label: string
  onClick: () => void
  variant?: PopupVariant
}

type PopupBoxProps = {
  isOpen: boolean
  title: string
  message?: string
  children?: ReactNode
  dataList?: Array<{ label: string; value: string }>
  variant?: PopupVariant
  primaryAction?: PopupAction
  secondaryAction?: PopupAction
  onClose: () => void
}

const variantLabel: Record<PopupVariant, string> = {
  default: 'Notice',
  info: 'Information',
  warning: 'Warning',
  danger: 'Danger',
  success: 'Success',
}

function PopupBox({
  isOpen,
  title,
  message,
  children,
  dataList,
  variant = 'default',
  primaryAction,
  secondaryAction,
  onClose,
}: PopupBoxProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="popup-card">
        <div className={`popup-header popup-${variant}`}>
          <span className="popup-variant">{variantLabel[variant]}</span>
          <h3>{title}</h3>
        </div>
        <div className="popup-body">
          {message && <p>{message}</p>}
          {dataList && (
            <dl>
              {dataList.map((item) => (
                <div key={item.label} className="popup-data-row">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {children}
        </div>
        <div className="popup-actions">
          {secondaryAction && (
            <button
              type="button"
              className="ghost-btn"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              type="button"
              className={`primary-btn ${
                primaryAction.variant ? `btn-${primaryAction.variant}` : ''
              }`}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
      <button
        type="button"
        className="popup-backdrop"
        onClick={onClose}
        aria-label="Close popup"
      />
    </div>
  )
}

export default PopupBox
