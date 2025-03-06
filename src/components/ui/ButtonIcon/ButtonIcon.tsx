import React, {ReactNode} from 'react'
import './ButtonIcon.scss'

interface ButtonIcon {
  icon: ReactNode
  width?: string | false
  tooltip?: string
  onClick?: () => void
}

export const ButtonIcon = ({
  icon,
  width = '44px',
  tooltip = '',
  onClick = () => {}
}: ButtonIcon) => {
  return (
    <div
      className="msgr__button-icon"
      style={{width: width ? width : '44px'}}
      title={tooltip}
      onClick={onClick}
    >
      {icon}
    </div>
  )
}
