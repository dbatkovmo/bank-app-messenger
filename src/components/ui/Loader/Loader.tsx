import React from 'react'
import './Loader.scss'

export const Loader = ({size = 40}: {size?: number}) => {
  return (
    <div className="msgr__loader">
      <div
        className="msgr__spinner"
        style={{
          borderWidth: `${size / 8}px`,
          borderTopWidth: `${size / 8}px`,
          width: size,
          height: size
        }}
      ></div>
    </div>
  )
}
