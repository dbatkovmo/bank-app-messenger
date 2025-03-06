import React from 'react'
import {useTranslate} from '../../../../core/hooks/useTranslate'
import {replaceSvgFill} from '../../../../utils/tools'
import {imagesUrl} from '../../../../configs/images-url'
import {useColors} from '../../../../core/hooks/useColors'

export const DialogStart = () => {
  const {t} = useTranslate()
  const {color} = useColors()

  return (
    <div className="msgr__dialog-start">
      <span>
        <img src={replaceSvgFill(imagesUrl.info, color)} alt="info" />
        {t('tips.select_chat')}
      </span>
    </div>
  )
}
